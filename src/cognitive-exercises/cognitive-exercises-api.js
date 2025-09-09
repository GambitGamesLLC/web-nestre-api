/**
 * cognitive-exercises-api.js
 * @file Handles API requests related to cognitive exercises and recommendations.
 * @description Provides a singleton class, `CognitiveExercisesApi`. 
 * This file centralizes all cognitive-exercises specific API logic.
 * The `CognitiveExerciesApi` class here is created automatically by the NestreApiManager class during construction
 * @exports {CognitiveExerciesApi}
 * @requires {NestreApiManager} from '../nestre-api-manager.js'
 * @requires {Joi} for schema validation
 */

//#region IMPORTS

import {NestreApiManager, HttpMethod} from '../nestre-api-manager.js';
import { CognitiveExerciseRecordSchema } from './cognitive-exercises-schemas.js';

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

//#endregion

/**
 * Handles API Requests that access the 'cognitive-exercises' portion of the API
 */
export class CognitiveExercisesApi 
{

//#region PRIVATE - VARIABLES

//#endregion

//#region PUBLIC - CONSTRUCTOR

  /**
   * Constructor for the Api
   */
  //----------------------------------------------//
  constructor() 
  //----------------------------------------------//
  {

  } //END Constructor Method

//#endregion

//#region PUBLIC - GET COGNITIVE EXERCISES RECOMMENDATION

 /**
   * Retrieve personalized cognitive exercise recommendations based on user's mindset profile and training goals
   * 
   * @param {string} userId
   * @returns {Promise<CognitiveExercisesRecommendation>}
   */
  //-----------------------------------------------------------------------//
  GetCognitiveExercisesRecommendation(userId) 
  //-----------------------------------------------------------------------//
  {
    // Check if the userId is a valid non-empty string.
    if (typeof userId !== 'string' || userId.trim().length === 0) 
    {
        // Return a rejected promise with a descriptive error.
        return Promise.reject(new Error("web-nestre-api : cognitive-exercises-api.js GetCognitiveExercisesRecommendation() Invalid userId: The userId must be a non-empty string."));
    }

    return NestreApiManager.GetInstance().Request( HttpMethod.GET, `user/${userId}/cogex`);

  } //END GetCognitiveExercisesRecommendation Method

//#endregion

//#region PUBLIC - RECORD EXERCISE INTERACTION

 /**
   * Record a user's interaction with a cognitive exercise round. This will also update the training progress table and completion status of the daily workout.
   * 
   * @param {string} userId
   * @param {CognitiveExerciseRecord} cognitiveExerciseRecord
   * @returns {Promise<RecordExerciseInteractionConfirmationMessage>}
   */
  //-----------------------------------------------------------------------//
  RecordCognitiveExerciseInteraction(userId, cognitiveExerciseRecord) 
  //-----------------------------------------------------------------------//
  {
    // Check if the userId is a valid non-empty string.
    if (typeof userId !== 'string' || userId.trim().length === 0) 
    {
        // Return a rejected promise with a descriptive error.
        return Promise.reject(new Error("web-nestre-api : cognitive-exercises-api.js RecordCognitiveExerciseInteraction() Invalid userId: The userId must be a non-empty string."));
    }

    // Validate the cognitiveExerciseRecord object against the imported Joi schema
    const { error } = CognitiveExerciseRecordSchema.validate(cognitiveExerciseRecord);

    if (error) {
        // Return a rejected promise with a descriptive error.
        return Promise.reject(new Error(`web-nestre-api : cognitive-exercises-api.js RecordCognitiveExerciseInteraction() Validation failed for cognitiveExerciseRecord: ${error.details[0].message}`));
    }

    return NestreApiManager.GetInstance().Request( HttpMethod.POST, `user/${userId}/cogex/interaction`, cognitiveExerciseRecord);

  } //END RecordCognitiveExerciseInteraction Method

//#endregion

//#region PUBLIC - GET CURRENT LEVEL FOR COGNITIVE EXERCISE

 /**
   * Get the current level for a specific cognitive exercise.
   * 
   * @param {string} userId
   * @param {CogexId} cogexId
   * @returns {Promise<UserProgressForExercise>}
   */
  //-----------------------------------------------------------------------//
  GetCurrentLevelForCognitiveExercise(userId, cogexId) 
  //-----------------------------------------------------------------------//
  {
    //Check if the cogexId is valid
    if(typeof cogexId !== 'string' || 
       cogexId.trim().length === 0 || 
       !['ATTENTION-1', 'IMPULSE-1', 'SALIENCE-1', 'MEMORY-1'].includes(cogexId))
    {
        // Return a rejected promise with a descriptive error.
        return Promise.reject(new Error("web-nestre-api : cognitive-exercises-api.js GetCurrentLevelForCognitiveExercise() Invalid cogexId: The cogexId must be a non-empty string and one of the following: ATTENTION-1, IMPULSE-1, SALIENCE-1, MEMORY-1."));
    }

    // Check if the userId is a valid non-empty string.
    if (typeof userId !== 'string' || userId.trim().length === 0) 
    {
        // Return a rejected promise with a descriptive error.
        return Promise.reject(new Error("web-nestre-api : cognitive-exercises-api.js GetCurrentLevelForCognitiveExercise() Invalid userId: The userId must be a non-empty string."));
    }

    return NestreApiManager.GetInstance().Request( HttpMethod.GET, `user/${userId}/cogex/${cogexId}/progress`);

  } //END GetCurrentLevelForCognitiveExercise Method


//#endregion

//#region PUBLIC - GET CURRENT SESSION INTERACTIONS

 /**
   * Get the current session interactions for a specific cognitive exercise.
   * 
   * @param {string} userId
   * @param {CogexId} cogexId
   * @returns {Promise<InteractionsForCurrentSession>}
   */
//-----------------------------------------------------------------------//
GetCurrentSessionInteractions(userId, cogexId)
//-----------------------------------------------------------------------//
{
    //Check if the cogexId is valid
    if(typeof cogexId !== 'string' || 
       cogexId.trim().length === 0 || 
       !['ATTENTION-1', 'IMPULSE-1', 'SALIENCE-1', 'MEMORY-1'].includes(cogexId))
    {
        // Return a rejected promise with a descriptive error.
        return Promise.reject(new Error("web-nestre-api : cognitive-exercises-api.js GetCurrentSessionInteractions() Invalid cogexId: The cogexId must be a non-empty string and one of the following: ATTENTION-1, IMPULSE-1, SALIENCE-1, MEMORY-1."));
    }

    // Check if the userId is a valid non-empty string.
    if (typeof userId !== 'string' || userId.trim().length === 0) 
    {
        // Return a rejected promise with a descriptive error.
        return Promise.reject(new Error("web-nestre-api : cognitive-exercises-api.js GetCurrentSessionInteractions() Invalid userId: The userId must be a non-empty string."));
    }

    return NestreApiManager.GetInstance().Request( HttpMethod.GET, `user/${userId}/cogex/${cogexId}/interactions-for-current-session`);

} //END GetCurrentSessionInteractions Method

//#endregion

//#region PUBLIC - GET CURRENT EXERCISE STATISTICS

 /**
   * Get the current statistics for a all cognitive exercises.
   * 
   * @param {string} userId
   * @returns {Promise<CurrentStatisticsForExercises>}
   */
//-----------------------------------------------------------------------//
GetCurrentExerciseStatistics(userId)
//-----------------------------------------------------------------------//
{
    // Check if the userId is a valid non-empty string.
    if (typeof userId !== 'string' || userId.trim().length === 0) 
    {
        // Return a rejected promise with a descriptive error.
        return Promise.reject(new Error("web-nestre-api : cognitive-exercises-api.js GetCurrentExerciseStatistics() Invalid userId: The userId must be a non-empty string."));
    }

    return NestreApiManager.GetInstance().Request( HttpMethod.GET, `user/${userId}/cogex/stats`);

} //END GetCurrentExerciseStatistics Method

//#endregion

//#region PUBLIC - GET CURRENT ROUND EXERCISE STATISTICS

 /**
   * Get the current round statistics for a specific cognitive exercise.
   * 
   * @param {string} userId
   * @param {CogexId} cogexId
   * @returns {Promise<CurrentRoundStatisticsForExercise>}
   */
//-----------------------------------------------------------------------//
GetCurrentRoundExerciseStatistics(userId, cogexId)
//-----------------------------------------------------------------------//
{
    //Check if the cogexId is valid
    if(typeof cogexId !== 'string' || 
       cogexId.trim().length === 0 || 
       !['ATTENTION-1', 'IMPULSE-1', 'SALIENCE-1', 'MEMORY-1'].includes(cogexId))
    {
        // Return a rejected promise with a descriptive error.
        return Promise.reject(new Error("web-nestre-api : cognitive-exercises-api.js GetCurrentRoundExerciseStatistics() Invalid cogexId: The cogexId must be a non-empty string and one of the following: ATTENTION-1, IMPULSE-1, SALIENCE-1, MEMORY-1."));
    }

    // Check if the userId is a valid non-empty string.
    if (typeof userId !== 'string' || userId.trim().length === 0) 
    {
        // Return a rejected promise with a descriptive error.
        return Promise.reject(new Error("web-nestre-api : cognitive-exercises-api.js GetCurrentRoundExerciseStatistics() Invalid userId: The userId must be a non-empty string."));
    }

    return NestreApiManager.GetInstance().Request( HttpMethod.GET, `user/${userId}/cogex/stats/${cogexId}`);

} //END GetCurrentRoundExerciseStatistics Method

//#endregion

//#region PUBLIC - GET NBACK DIFFICULTY

 /**
   * Get the difficulty parameters for the N-Back exercise.
   * 
   * @param {string} userId
   * @param {number} level
   * @returns {Promise<NBackDifficulty>}
   */
//-----------------------------------------------------------------------//
GetNBackDifficulty(userId, level)
//-----------------------------------------------------------------------//
{
    // Check if the userId is a valid non-empty string.
    if (typeof userId !== 'string' || userId.trim().length === 0) 
    {
        // Return a rejected promise with a descriptive error.
        return Promise.reject(new Error("web-nestre-api : cognitive-exercises-api.js GetNBackDifficulty() Invalid userId: The userId must be a non-empty string."));
    }

    // Check if the level is a valid number that is greater than or equal to 1.
    if (typeof level !== 'number' || level <= 0)
    {
        // Return a rejected promise with a descriptive error.
        return Promise.reject(new Error("web-nestre-api : cognitive-exercises-api.js GetNBackDifficulty() Invalid level: The level must be a positive number that's greater than or equal to 1"));
    }

    return NestreApiManager.GetInstance().Request( HttpMethod.GET, `user/${userId}/cogex/nback/difficulty?level=${level}`);

} //END GetNBackDifficulty Method

//#endregion

//#region PUBLIC - GET NBACK SEQUENCE

 /**
   * Generate a sequence for the N-Back working memory exercise based on difficulty level and mindset version
   * 
   * @param {string} userId
   * @param {number} level
   * @param {NBackVersion} version
   * @returns {Promise<NBackSequence>}
   */
//-----------------------------------------------------------------------//
GetNBackSequence(userId, level, version)
//-----------------------------------------------------------------------//
{
    // Check if the userId is a valid non-empty string.
    if (typeof userId !== 'string' || userId.trim().length === 0) 
    {
        // Return a rejected promise with a descriptive error.
        return Promise.reject(new Error("web-nestre-api : cognitive-exercises-api.js GetNBackSequence() Invalid userId: The userId must be a non-empty string."));
    }

    // Check if the level is a valid number that is greater than or equal to 1.
    if (typeof level !== 'number' || level <= 0)
    {
        // Return a rejected promise with a descriptive error.
        return Promise.reject(new Error("web-nestre-api : cognitive-exercises-api.js GetNBackSequence() Invalid level: The level must be a positive number that's greater than or equal to 1"));
    }

    //Check if the version is valid
    if(typeof version !== 'string' || 
       version.trim().length === 0 || 
       !['alpha', 'cerebral', 'prime'].includes(version))
    {
        // Return a rejected promise with a descriptive error.
        return Promise.reject(new Error("web-nestre-api : cognitive-exercises-api.js GetNBackSequence() Invalid version: The version must be a non-empty string and one of the following: 'alpha', 'cerebral', 'prime'."));
    }

    return NestreApiManager.GetInstance().Request( HttpMethod.GET, `user/${userId}/cogex/nback/sequence?level=${level}&version=${version}`);

} //END GetNBackSequence Method

//#endregion

//#region PUBLIC - GET CATCHME DIFFICULTY

 /**
   * Get the difficulty parameters for the CatchMe exercise.
   * 
   * @param {string} userId
   * @param {number} level
   * @returns {Promise<CatchMeDifficulty>}
   */
//-----------------------------------------------------------------------//
GetCatchMeDifficulty(userId, level)
//-----------------------------------------------------------------------//
{
    // Check if the userId is a valid non-empty string.
    if (typeof userId !== 'string' || userId.trim().length === 0) 
    {
        // Return a rejected promise with a descriptive error.
        return Promise.reject(new Error("web-nestre-api : cognitive-exercises-api.js GetCatchMeDifficulty() Invalid userId: The userId must be a non-empty string."));
    }

    // Check if the level is a valid number that is greater than or equal to 1.
    if (typeof level !== 'number' || level <= 0)
    {
        // Return a rejected promise with a descriptive error.
        return Promise.reject(new Error("web-nestre-api : cognitive-exercises-api.js GetCatchMeDifficulty() Invalid level: The level must be a positive number that's greater than or equal to 1"));
    }

    return NestreApiManager.GetInstance().Request( HttpMethod.GET, `user/${userId}/cogex/catchme/difficulty?level=${level}`);

} //END GetCatchMeDifficulty Method

//#endregion

//#region PUBLIC - GET CATCHME SEQUENCE

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
//-----------------------------------------------------------------------//
GetCatchMeSequence(userId, level, version, criteria, criteriaType)
//-----------------------------------------------------------------------//
{
    // Check if the userId is a valid non-empty string.
    if (typeof userId !== 'string' || userId.trim().length === 0) 
    {
        // Return a rejected promise with a descriptive error.
        return Promise.reject(new Error("web-nestre-api : cognitive-exercises-api.js GetCatchMeSequence() Invalid userId: The userId must be a non-empty string."));
    }

    // Check if the level is a valid number that is greater than or equal to 1.
    if (typeof level !== 'number' || level <= 0)
    {
        // Return a rejected promise with a descriptive error.
        return Promise.reject(new Error("web-nestre-api : cognitive-exercises-api.js GetCatchMeSequence() Invalid level: The level must be a positive number that's greater than or equal to 1"));
    }

    //Check if the version is valid
    if(typeof version !== 'string' || 
       version.trim().length === 0 || 
       !['alpha', 'cerebral', 'prime'].includes(version))
    {
        // Return a rejected promise with a descriptive error.
        return Promise.reject(new Error("web-nestre-api : cognitive-exercises-api.js GetCatchMeSequence() Invalid version: The version must be a non-empty string and one of the following: 'alpha', 'cerebral', 'prime'."));
    }

    // Check if the criteria is a valid non-empty string.
    if (typeof criteria !== 'string' || criteria.trim().length === 0) 
    {
        // Return a rejected promise with a descriptive error.
        return Promise.reject(new Error("web-nestre-api : cognitive-exercises-api.js GetCatchMeSequence() Invalid criteria: The criteria must be a non-empty string."));
    }

    //Check if the criteriaType is valid
    if(typeof criteriaType !== 'string' || 
       criteriaType.trim().length === 0 || 
       !['assertiveness', 'prudence'].includes(criteriaType))
    {
        // Return a rejected promise with a descriptive error.
        return Promise.reject(new Error("web-nestre-api : cognitive-exercises-api.js GetCatchMeSequence() Invalid criteriaType: The criteriaType must be a non-empty string and one of the following: 'assertiveness', 'prudence'."));
    }

    return NestreApiManager.GetInstance().Request( HttpMethod.GET, `user/${userId}/cogex/catchme/sequence?level=${level}&version=${version}&criteria=${criteria}&criteria_type=${criteriaType}`);

} //END GetCatchMeSequence Method

//#endregion

//#region PUBLIC - GET SALIENCE DIFFICULTY

 /**
   * Get the difficulty parameters for the Salience exercise.
   * 
   * @param {string} userId
   * @param {number} level
   * @returns {Promise<SalienceDifficulty>}
   */
//-----------------------------------------------------------------------//
GetSalienceDifficulty(userId, level)
//-----------------------------------------------------------------------//
{
    // Check if the userId is a valid non-empty string.
    if (typeof userId !== 'string' || userId.trim().length === 0) 
    {
        // Return a rejected promise with a descriptive error.
        return Promise.reject(new Error("web-nestre-api : cognitive-exercises-api.js GetSalienceDifficulty() Invalid userId: The userId must be a non-empty string."));
    }

    // Check if the level is a valid number that is greater than or equal to 1.
    if (typeof level !== 'number' || level <= 0)
    {
        // Return a rejected promise with a descriptive error.
        return Promise.reject(new Error("web-nestre-api : cognitive-exercises-api.js GetSalienceDifficulty() Invalid level: The level must be a positive number that's greater than or equal to 1"));
    }

    return NestreApiManager.GetInstance().Request( HttpMethod.GET, `user/${userId}/cogex/salience/difficulty?level=${level}`);

} //END GetSalienceDifficulty Method

//#endregion

//#region PUBLIC - GET SALIENCE SEQUENCE

 /**
   * Get a sequence for the Salience exercise.
   * 
   * @param {string} userId
   * @param {number} level
   * @param {SalienceVersion} version
   * @returns {Promise<SalienceSequence>}
   */
//-----------------------------------------------------------------------//
GetSalienceSequence(userId, level, version)
//-----------------------------------------------------------------------//
{
    // Check if the userId is a valid non-empty string.
    if (typeof userId !== 'string' || userId.trim().length === 0) 
    {
        // Return a rejected promise with a descriptive error.
        return Promise.reject(new Error("web-nestre-api : cognitive-exercises-api.js GetSalienceSequence() Invalid userId: The userId must be a non-empty string."));
    }

    // Check if the level is a valid number that is greater than or equal to 1.
    if (typeof level !== 'number' || level <= 0)
    {
        // Return a rejected promise with a descriptive error.
        return Promise.reject(new Error("web-nestre-api : cognitive-exercises-api.js GetSalienceSequence() Invalid level: The level must be a positive number that's greater than or equal to 1"));
    }

    //Check if the version is valid
    if(typeof version !== 'string' || 
       version.trim().length === 0 || 
       !['alpha', 'cerebral'].includes(version))
    {
        // Return a rejected promise with a descriptive error.
        return Promise.reject(new Error("web-nestre-api : cognitive-exercises-api.js GetSalienceSequence() Invalid version: The version must be a non-empty string and one of the following: 'alpha', 'cerebral'."));
    }

    return NestreApiManager.GetInstance().Request( HttpMethod.GET, `user/${userId}/cogex/salience/sequence?level=${level}&version=${version}`);

} //END GetSalienceSequence Method

//#endregion

//#region PUBLIC - GET IMPULSE DIFFICULTY

 /**
   * Get the difficulty parameters for the Impulse exercise.
   * 
   * @param {string} userId
   * @param {number} level
   * @returns {Promise<ImpulseDifficulty>}
   */
//-----------------------------------------------------------------------//
GetImpulseDifficulty(userId, level)
//-----------------------------------------------------------------------//
{
    // Check if the userId is a valid non-empty string.
    if (typeof userId !== 'string' || userId.trim().length === 0) 
    {
        // Return a rejected promise with a descriptive error.
        return Promise.reject(new Error("web-nestre-api : cognitive-exercises-api.js GetImpulseDifficulty() Invalid userId: The userId must be a non-empty string."));
    }

    // Check if the level is a valid number that is greater than or equal to 1.
    if (typeof level !== 'number' || level <= 0)
    {
        // Return a rejected promise with a descriptive error.
        return Promise.reject(new Error("web-nestre-api : cognitive-exercises-api.js GetImpulseDifficulty() Invalid level: The level must be a positive number that's greater than or equal to 1"));
    }

    return NestreApiManager.GetInstance().Request( HttpMethod.GET, `user/${userId}/cogex/impulse/difficulty?level=${level}`);

} //END GetImpulseDifficulty Method

//#endregion

//#region PUBLIC - GET IMPULSE SEQUENCE

 /**
   * Get a sequence for the Impulse Control exercise for a specific round (1-5) and difficulty level
   * 
   * @param {string} userId
   * @param {number} level
   * @param {number} roundNumber
   * @param {ImpulseVersion} version
   * @returns {Promise<ImpulseSequence>}
   */
//-----------------------------------------------------------------------//
GetImpulseSequence(userId, level, roundNumber, version)
//-----------------------------------------------------------------------//
{
    // Check if the userId is a valid non-empty string.
    if (typeof userId !== 'string' || userId.trim().length === 0) 
    {
        // Return a rejected promise with a descriptive error.
        return Promise.reject(new Error("web-nestre-api : cognitive-exercises-api.js GetImpulseSequence() Invalid userId: The userId must be a non-empty string."));
    }

    // Check if the level is a valid number that is greater than or equal to 1.
    if (typeof level !== 'number' || level <= 0)
    {
        // Return a rejected promise with a descriptive error.
        return Promise.reject(new Error("web-nestre-api : cognitive-exercises-api.js GetImpulseSequence() Invalid level: The level must be a positive number that's greater than or equal to 1"));
    }

    // Check if the roundNumber is a valid number that is between 1-5.
    if (typeof roundNumber !== 'number' || roundNumber < 1 || roundNumber > 5 )
    {
        // Return a rejected promise with a descriptive error.
        return Promise.reject(new Error("web-nestre-api : cognitive-exercises-api.js GetImpulseSequence() Invalid roundNumber: The roundNumber must be a positive number that's between 1 and 5"));
    }

    //Check if the version is valid
    if(typeof version !== 'string' || 
       version.trim().length === 0 || 
       !['alpha', 'cerebral', 'prime'].includes(version))
    {
        // Return a rejected promise with a descriptive error.
        return Promise.reject(new Error("web-nestre-api : cognitive-exercises-api.js GetImpulseSequence() Invalid version: The version must be a non-empty string and one of the following: 'alpha', 'cerebral', 'prime'."));
    }

    return NestreApiManager.GetInstance().Request( HttpMethod.GET, `user/${userId}/cogex/impulse/sequence?level=${level}&round_number=${roundNumber}&version=${version}`);

} //END GetImpulseSequence Method

//#endregion

} //END CognitiveExercisesApi Class