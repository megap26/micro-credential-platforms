import { LearningProgress, Curriculum } from '../models/index.js';

/**
 * @desc    Get learning progress for a curriculum
 * @route   GET /api/learning/:curriculumId
 * @access  Private
 */
export const getLearningProgress = async (req, res, next) => {
  try {
    const { curriculumId } = req.params;

    let progress = await LearningProgress.findOne({
      userId: req.user._id,
      curriculumId,
    });

    const curriculum = await Curriculum.findById(curriculumId);
    if (!curriculum) {
      return res.status(404).json({
        success: false,
        message: 'Curriculum not found.',
      });
    }

    if (!progress) {
      progress = await LearningProgress.create({
        userId: req.user._id,
        curriculumId,
        overallProgressPercent: 0,
        completedModules: [],
        currentModuleId: curriculum.modules[0]?.id || '',
        lastAccessedAt: new Date(),
      });
    }

    res.status(200).json({
      success: true,
      progress,
      curriculum,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Toggle module completion or update active module
 * @route   POST /api/learning/:curriculumId/module
 * @access  Private
 */
export const updateModuleProgress = async (req, res, next) => {
  try {
    const { curriculumId } = req.params;
    const { moduleId, isCompleted, currentModuleId, practicalSubmission, notes } = req.body;

    const curriculum = await Curriculum.findById(curriculumId);
    if (!curriculum) {
      return res.status(404).json({
        success: false,
        message: 'Curriculum not found.',
      });
    }

    let progress = await LearningProgress.findOne({
      userId: req.user._id,
      curriculumId,
    });

    if (!progress) {
      progress = await LearningProgress.create({
        userId: req.user._id,
        curriculumId,
        overallProgressPercent: 0,
        completedModules: [],
        currentModuleId: moduleId,
        lastAccessedAt: new Date(),
      });
    }

    const totalModulesCount = curriculum.modules.length || 1;
    let completedSet = new Set(progress.completedModules || []);

    if (moduleId && isCompleted !== undefined) {
      if (isCompleted) {
        completedSet.add(moduleId);
      } else {
        completedSet.delete(moduleId);
      }
    }

    progress.completedModules = Array.from(completedSet);
    progress.overallProgressPercent = Math.min(
      100,
      Math.round((progress.completedModules.length / totalModulesCount) * 100)
    );

    if (currentModuleId) {
      progress.currentModuleId = currentModuleId;
    }

    if (notes !== undefined) {
      progress.notes = notes;
    }

    if (practicalSubmission) {
      if (!progress.practicalSubmissions) progress.practicalSubmissions = [];
      progress.practicalSubmissions.push({
        moduleId: moduleId || progress.currentModuleId,
        submissionText: practicalSubmission.text || '',
        repoUrl: practicalSubmission.repoUrl || '',
        status: 'submitted',
        submittedAt: new Date(),
      });
    }

    progress.lastAccessedAt = new Date();
    await progress.save();

    res.status(200).json({
      success: true,
      message: 'Learning progress updated successfully.',
      progress,
    });
  } catch (error) {
    next(error);
  }
};
