/**
 * assessment-schemas.js
 * @file Joi schemas for validating assessment data objects.
 * @description This file exports Joi validation schemas for the objects used in the Assessment API. 
 * These schemas are used to ensure the data sent to the API functions has the correct shape and type.
 * @exports {AssessmentResponsesSchema}
 */

//#region IMPORTS

import Joi from '../../vendor/joi/joi.js';

//#endregion

//#region ASSESSMENT - VALID QUESTION IDS

const validQuestionIds = [
    'bCZ7FSju7aQdUbNFQ7hfd', '3JTBUeVqS7mum6YErk0e0Y', '3CNimutSbaAnAucrVvyupx',
    '6ugahfvmQqZW9vohWKfvte', '5EnjhhFBhH7KammXba4xcO', '2Dku9IfXzhSmv0erxeVMV2',
    '4j72p4Jznmtpticm5atZno', '2MQ1V0J6QHrf9YjvdBKNab', '6DubZxJIfXNviGzfbITLCA',
    '3FQ1q8nghtsasGTzGgKC8I', '41UrVk57Uo7XgvAgUqOPLb', '6a6hUC7nw4n6XcvYnEJzUZ',
    'X5a4NftS4NxGXkoPStBrs', '45suVW99wXZmhKQruO8Lme', '6eGU3dzh9kiXR5n90mZgVN',
    'lSSWizDYp3JQOTrT9Jmpi', '30W6xGxvRZyFraQcXjojNy', 'nTOUJAPWlTSRDvEf5q5O3',
    '7F22NiUUeufVbZr0mpTetn', '1DwjIVJ3pFYzHYEZYlmCzB', '5c256kPsJKNzqt5vp5yIcM',
    '7FmYy5koR7SzrVie1bhDgi', '5ouWXQfAjExsx3FMFLc1yq', '52m7uUJaR1cTorbiQGATbS',
    '6Bmjw1yK7FbS5wjbMjRTFj'
];

//#endregion

//#region ASSESSMENT - ASSESSMENT RESPONSES SCHEMA

/**
 * Joi schema for validating the AssessmentResponses object.
 */
export const AssessmentResponsesSchema = Joi.object({
    responses: Joi.array().items(
        Joi.object({
            question_id: Joi.string().valid(...validQuestionIds).required(),
            score: Joi.number().required()
        })
    ).length(25).required()
}).unknown(false); // Prevents unknown keys

//#endregion
