/**
 * @typedef {import('./cognitive-exercises-types.js').CognitiveExercisesRecommendation} CognitiveExercisesRecommendation
 * @typedef {import('./cognitive-exercises-types.js').CognitiveExerciseRecord } CognitiveExerciseRecord
 * @typedef {import('./cognitive-exercises-types.js').RecordExerciseInteractionConfirmationMessage } RecordExerciseInteractionConfirmationMessage
 * @typedef {import('./cognitive-exercises-types.js').CogexId } CogexId
 * @typedef {import('./cognitive-exercises-types.js').UserProgressForExercise } UserProgressForExercise
 * @typedef {import('./cognitive-exercises-types.js').InteractionsForCurrentSession } InteractionsForCurrentSession
 * @typedef {import('./cognitive-exercises-types.js').CurrentStatisticsForExercises } CurrentStatisticsForExercises
 * @typedef {import('./cognitive-exercises-types.js').CurrentRoundStatisticsForExercise } CurrentRoundStatisticsForExercise
 * @typedef {import('./cognitive-exercises-types.js').NBackDifficulty } NBackDifficulty
 * @typedef {import('./cognitive-exercises-types.js').NBackVersion } NBackVersion
 * @typedef {import('./cognitive-exercises-types.js').NBackSequence } NBackSequence
 * @typedef {import('./cognitive-exercises-types.js').CatchMeDifficulty } CatchMeDifficulty
 * @typedef {import('./cognitive-exercises-types.js').CatchMeSequence } CatchMeSequence
 * @typedef {import('./cognitive-exercises-types.js').CatchMeVersion } CatchMeVersion
 * @typedef {import('./cognitive-exercises-types.js').CatchMeCriteriaType } CatchMeCriteriaType
 * @typedef {import('./cognitive-exercises-types.js').SalienceDifficulty } SalienceDifficulty
 * @typedef {import('./cognitive-exercises-types.js').SalienceSequence } SalienceSequence
 * @typedef {import('./cognitive-exercises-types.js').SalienceVersion } SalienceVersion
 * @typedef {import('./cognitive-exercises-types.js').ImpulseDifficulty } ImpulseDifficulty
 * @typedef {import('./cognitive-exercises-types.js').ImpulseSequence } ImpulseSequence
 * @typedef {import('./cognitive-exercises-types.js').ImpulseVersion } ImpulseVersion
*/
/**
 * Handles API Requests that access the 'cognitive-exercises' portion of the API
 */
export class CognitiveExercisesApi {
    /**
      * Retrieve personalized cognitive exercise recommendations based on user's mindset profile and training goals
      *
      * @param {string} userId
      * @returns {Promise<CognitiveExercisesRecommendation>}
      */
    GetCognitiveExercisesRecommendation(userId: string): Promise<CognitiveExercisesRecommendation>;
    /**
      * Record a user's interaction with a cognitive exercise round. This will also update the training progress table and completion status of the daily workout.
      *
      * @param {string} userId
      * @param {CognitiveExerciseRecord} cognitiveExerciseRecord
      * @returns {Promise<RecordExerciseInteractionConfirmationMessage>}
      */
    RecordCognitiveExerciseInteraction(userId: string, cognitiveExerciseRecord: CognitiveExerciseRecord): Promise<RecordExerciseInteractionConfirmationMessage>;
    /**
      * Get the current level for a specific cognitive exercise.
      *
      * @param {string} userId
      * @param {CogexId} cogexId
      * @returns {Promise<UserProgressForExercise>}
      */
    GetCurrentLevelForCognitiveExercise(userId: string, cogexId: CogexId): Promise<UserProgressForExercise>;
    /**
      * Get the current session interactions for a specific cognitive exercise.
      *
      * @param {string} userId
      * @param {CogexId} cogexId
      * @returns {Promise<InteractionsForCurrentSession>}
      */
    GetCurrentSessionInteractions(userId: string, cogexId: CogexId): Promise<InteractionsForCurrentSession>;
    /**
      * Get the current statistics for a all cognitive exercises.
      *
      * @param {string} userId
      * @returns {Promise<CurrentStatisticsForExercises>}
      */
    GetCurrentExerciseStatistics(userId: string): Promise<CurrentStatisticsForExercises>;
    /**
      * Get the current round statistics for a specific cognitive exercise.
      *
      * @param {string} userId
      * @param {CogexId} cogexId
      * @returns {Promise<CurrentRoundStatisticsForExercise>}
      */
    GetCurrentRoundExerciseStatistics(userId: string, cogexId: CogexId): Promise<CurrentRoundStatisticsForExercise>;
    /**
      * Get the difficulty parameters for the N-Back exercise.
      *
      * @param {string} userId
      * @param {number} level
      * @returns {Promise<NBackDifficulty>}
      */
    GetNBackDifficulty(userId: string, level: number): Promise<NBackDifficulty>;
    /**
      * Generate a sequence for the N-Back working memory exercise based on difficulty level and mindset version
      *
      * @param {string} userId
      * @param {number} level
      * @param {NBackVersion} version
      * @returns {Promise<NBackSequence>}
      */
    GetNBackSequence(userId: string, level: number, version: NBackVersion): Promise<NBackSequence>;
    /**
      * Get the difficulty parameters for the CatchMe exercise.
      *
      * @param {string} userId
      * @param {number} level
      * @returns {Promise<CatchMeDifficulty>}
      */
    GetCatchMeDifficulty(userId: string, level: number): Promise<CatchMeDifficulty>;
    /**
      * Get a sequence for the CatchMe exercise.
      *
      * @param {string} userId
      * @param {number} level
      * @param {CatchMeVersion} version
      * @param {string} criteria
      * @param {CatchMeCriteriaType} criteriaType
      * @returns {Promise<CatchMeSequence>}
      */
    GetCatchMeSequence(userId: string, level: number, version: CatchMeVersion, criteria: string, criteriaType: CatchMeCriteriaType): Promise<CatchMeSequence>;
    /**
      * Get the difficulty parameters for the Salience exercise.
      *
      * @param {string} userId
      * @param {number} level
      * @returns {Promise<SalienceDifficulty>}
      */
    GetSalienceDifficulty(userId: string, level: number): Promise<SalienceDifficulty>;
    /**
      * Get a sequence for the Salience exercise.
      *
      * @param {string} userId
      * @param {number} level
      * @param {SalienceVersion} version
      * @returns {Promise<SalienceSequence>}
      */
    GetSalienceSequence(userId: string, level: number, version: SalienceVersion): Promise<SalienceSequence>;
    /**
      * Get the difficulty parameters for the Impulse exercise.
      *
      * @param {string} userId
      * @param {number} level
      * @returns {Promise<ImpulseDifficulty>}
      */
    GetImpulseDifficulty(userId: string, level: number): Promise<ImpulseDifficulty>;
    /**
      * Get a sequence for the Impulse Control exercise for a specific round (1-5) and difficulty level
      *
      * @param {string} userId
      * @param {number} level
      * @param {number} roundNumber
      * @param {ImpulseVersion} version
      * @returns {Promise<ImpulseSequence>}
      */
    GetImpulseSequence(userId: string, level: number, roundNumber: number, version: ImpulseVersion): Promise<ImpulseSequence>;
}
export type CognitiveExercisesRecommendation = import("./cognitive-exercises-types.js").CognitiveExercisesRecommendation;
export type CognitiveExerciseRecord = import("./cognitive-exercises-types.js").CognitiveExerciseRecord;
export type RecordExerciseInteractionConfirmationMessage = import("./cognitive-exercises-types.js").RecordExerciseInteractionConfirmationMessage;
export type CogexId = import("./cognitive-exercises-types.js").CogexId;
export type UserProgressForExercise = import("./cognitive-exercises-types.js").UserProgressForExercise;
export type InteractionsForCurrentSession = import("./cognitive-exercises-types.js").InteractionsForCurrentSession;
export type CurrentStatisticsForExercises = import("./cognitive-exercises-types.js").CurrentStatisticsForExercises;
export type CurrentRoundStatisticsForExercise = import("./cognitive-exercises-types.js").CurrentRoundStatisticsForExercise;
export type NBackDifficulty = import("./cognitive-exercises-types.js").NBackDifficulty;
export type NBackVersion = import("./cognitive-exercises-types.js").NBackVersion;
export type NBackSequence = import("./cognitive-exercises-types.js").NBackSequence;
export type CatchMeDifficulty = import("./cognitive-exercises-types.js").CatchMeDifficulty;
export type CatchMeSequence = import("./cognitive-exercises-types.js").CatchMeSequence;
export type CatchMeVersion = import("./cognitive-exercises-types.js").CatchMeVersion;
export type CatchMeCriteriaType = import("./cognitive-exercises-types.js").CatchMeCriteriaType;
export type SalienceDifficulty = import("./cognitive-exercises-types.js").SalienceDifficulty;
export type SalienceSequence = import("./cognitive-exercises-types.js").SalienceSequence;
export type SalienceVersion = import("./cognitive-exercises-types.js").SalienceVersion;
export type ImpulseDifficulty = import("./cognitive-exercises-types.js").ImpulseDifficulty;
export type ImpulseSequence = import("./cognitive-exercises-types.js").ImpulseSequence;
export type ImpulseVersion = import("./cognitive-exercises-types.js").ImpulseVersion;
