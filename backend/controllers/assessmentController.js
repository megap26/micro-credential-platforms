import { Assessment, AssessmentAttempt, Curriculum } from '../models/index.js';
import { SAMPLE_ASSESSMENTS } from '../data/seedAssessments.js';

/**
 * @desc    Get assessment for a curriculum (without leaking correct answers)
 * @route   GET /api/assessments/curriculum/:curriculumId
 * @access  Private
 */
export const getAssessmentByCurriculum = async (req, res, next) => {
  try {
    const { curriculumId } = req.params;

    let assessment = await Assessment.findOne({ curriculumId });

    if (!assessment) {
      // Find curriculum to create appropriate assessment
      const curriculum = await Curriculum.findById(curriculumId);
      if (!curriculum) {
        return res.status(404).json({
          success: false,
          message: 'Curriculum not found.',
        });
      }

      const template = SAMPLE_ASSESSMENTS[curriculum.targetJobRole] || SAMPLE_ASSESSMENTS['Full Stack Developer'];
      assessment = await Assessment.create({
        curriculumId,
        title: `${curriculum.title} - Competency Exam`,
        description: `Assessment of demonstrated competencies for ${curriculum.targetJobRole}.`,
        targetRole: curriculum.targetJobRole,
        passingScorePercent: curriculum.passingScorePercent || 75,
        timeLimitMinutes: 20,
        questions: template.questions,
      });
    }

    // Sanitize questions to avoid leaking correct answers to client before submission!
    const clientQuestions = assessment.questions.map((q, idx) => ({
      index: idx,
      id: q.id,
      questionText: q.questionText,
      codeSnippet: q.codeSnippet,
      options: q.options,
      competencyTag: q.competencyTag,
      difficulty: q.difficulty,
    }));

    // Fetch previous user attempts
    const previousAttempts = await AssessmentAttempt.find({
      userId: req.user._id,
      curriculumId,
    });

    res.status(200).json({
      success: true,
      assessment: {
        _id: assessment._id,
        curriculumId: assessment.curriculumId,
        title: assessment.title,
        description: assessment.description,
        targetRole: assessment.targetRole,
        passingScorePercent: assessment.passingScorePercent,
        timeLimitMinutes: assessment.timeLimitMinutes,
        questionsCount: clientQuestions.length,
        questions: clientQuestions,
      },
      previousAttempts: previousAttempts || [],
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Submit assessment attempt & perform server-side grading
 * @route   POST /api/assessments/:assessmentId/submit
 * @access  Private
 */
export const submitAssessmentAttempt = async (req, res, next) => {
  try {
    const { assessmentId } = req.params;
    const { userAnswers = [], timeSpentSeconds = 0 } = req.body;

    const assessment = await Assessment.findById(assessmentId);
    if (!assessment) {
      return res.status(404).json({
        success: false,
        message: 'Assessment not found.',
      });
    }

    // Count previous attempts to increment attempt number
    const previousCount = await AssessmentAttempt.countDocuments({
      userId: req.user._id,
      assessmentId: assessment._id,
    });

    let correctCount = 0;
    const gradedDetails = [];

    assessment.questions.forEach((q, idx) => {
      const submitted = userAnswers.find(a => a.questionIndex === idx);
      const selectedIndex = submitted !== undefined ? submitted.selectedOptionIndex : -1;
      const isCorrect = selectedIndex === q.correctOptionIndex;

      if (isCorrect) correctCount++;

      gradedDetails.push({
        questionIndex: idx,
        questionText: q.questionText,
        options: q.options,
        selectedOptionIndex: selectedIndex,
        correctOptionIndex: q.correctOptionIndex,
        isCorrect,
        explanation: q.explanation,
        competencyTag: q.competencyTag,
      });
    });

    const totalQuestions = assessment.questions.length;
    const scorePercent = totalQuestions > 0 ? Math.round((correctCount / totalQuestions) * 100) : 0;
    const passed = scorePercent >= (assessment.passingScorePercent || 75);

    const attempt = await AssessmentAttempt.create({
      userId: req.user._id,
      curriculumId: assessment.curriculumId,
      assessmentId: assessment._id,
      attemptNumber: previousCount + 1,
      answers: gradedDetails.map(g => ({
        questionIndex: g.questionIndex,
        selectedOptionIndex: g.selectedOptionIndex,
        isCorrect: g.isCorrect,
      })),
      scorePercent,
      passed,
      timeSpentSeconds,
      feedback: passed
        ? `Outstanding performance! You scored ${scorePercent}% and fulfilled all micro-credential verification criteria.`
        : `You scored ${scorePercent}%. The passing threshold is ${assessment.passingScorePercent}%. Review the answer explanations and retake when ready.`,
      completedAt: new Date(),
    });

    res.status(200).json({
      success: true,
      message: passed ? 'Assessment Passed! Credential unlocked.' : 'Assessment Completed.',
      attempt: {
        _id: attempt._id,
        attemptNumber: attempt.attemptNumber,
        scorePercent,
        passed,
        passingScorePercent: assessment.passingScorePercent,
        correctCount,
        totalQuestions,
        timeSpentSeconds,
        feedback: attempt.feedback,
        gradedDetails,
      },
    });
  } catch (error) {
    next(error);
  }
};
