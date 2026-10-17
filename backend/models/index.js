import { isConnectedToMongo } from '../config/db.js';
import { inMemoryDb } from '../config/inMemoryDb.js';

import UserModel from './User.js';
import LearnerProfileModel from './LearnerProfile.js';
import SkillModel from './Skill.js';
import JobPostingModel from './JobPosting.js';
import SkillDemandModel from './SkillDemand.js';
import CurriculumModel from './Curriculum.js';
import CurriculumVersionModel from './CurriculumVersion.js';
import LearningProgressModel from './LearningProgress.js';
import AssessmentModel from './Assessment.js';
import AssessmentAttemptModel from './AssessmentAttempt.js';
import CredentialModel from './Credential.js';
import IndustryReviewModel from './IndustryReview.js';

function createModelProxy(modelName, mongooseModel) {
  return new Proxy(mongooseModel, {
    get(target, prop) {
      if (isConnectedToMongo) {
        return target[prop];
      }
      const memCollection = inMemoryDb.getCollection(modelName);
      if (typeof memCollection[prop] === 'function') {
        return memCollection[prop].bind(memCollection);
      }
      return memCollection[prop] || target[prop];
    },
    apply(target, thisArg, argArray) {
      if (isConnectedToMongo) {
        return Reflect.apply(target, thisArg, argArray);
      }
      // If someone does new User(data)
      const memCollection = inMemoryDb.getCollection(modelName);
      const doc = argArray[0] || {};
      return memCollection.wrapDoc(doc);
    }
  });
}

export const User = createModelProxy('User', UserModel);
export const LearnerProfile = createModelProxy('LearnerProfile', LearnerProfileModel);
export const Skill = createModelProxy('Skill', SkillModel);
export const JobPosting = createModelProxy('JobPosting', JobPostingModel);
export const SkillDemand = createModelProxy('SkillDemand', SkillDemandModel);
export const Curriculum = createModelProxy('Curriculum', CurriculumModel);
export const CurriculumVersion = createModelProxy('CurriculumVersion', CurriculumVersionModel);
export const LearningProgress = createModelProxy('LearningProgress', LearningProgressModel);
export const Assessment = createModelProxy('Assessment', AssessmentModel);
export const AssessmentAttempt = createModelProxy('AssessmentAttempt', AssessmentAttemptModel);
export const Credential = createModelProxy('Credential', CredentialModel);
export const IndustryReview = createModelProxy('IndustryReview', IndustryReviewModel);
export { isConnectedToMongo };
