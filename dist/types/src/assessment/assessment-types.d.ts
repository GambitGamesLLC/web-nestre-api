/**
 * assessment-types.js
 * @file Type definitions for the Nestre Assessment API data objects.
 * @description This file provides JSDoc `@typedefs` for all data structures used by the Nestre API.
 * These types are crucial for static analysis, autocompletion in IDEs,
 * and ensuring consistent data handling throughout the codebase.
 * @exports {object}
 */
/**
 * An array of valid assessment question IDs.
 * @type {string[]}
 */
export const validQuestionIds: string[];
export type RandomizedQuestion = {
    id: string;
    title: string;
    section: number;
};
/**
 * List of assessment questions in randomized order
 */
export type RandomizedAssessmentQuestions = RandomizedQuestion[];
/**
 * Submit completed assessment responses and receive calculated mindset profile with personalized summaries
 */
export type AssessmentResult = {
    id: string;
    alpha: number;
    cerebral: number;
    prime: number;
    created_at: string;
    assessment_summary: string[];
};
export type AssessmentQuestionId = "bCZ7FSju7aQdUbNFQ7hfd" | "3JTBUeVqS7mum6YErk0e0Y" | "3CNimutSbaAnAucrVvyupx" | "6ugahfvmQqZW9vohWKfvte" | "5EnjhhFBhH7KammXba4xcO" | "2Dku9IfXzhSmv0erxeVMV2" | "4j72p4Jznmtpticm5atZno" | "2MQ1V0J6QHrf9YjvdBKNab" | "6DubZxJIfXNviGzfbITLCA" | "3FQ1q8nghtsasGTzGgKC8I" | "41UrVk57Uo7XgvAgUqOPLb" | "6a6hUC7nw4n6XcvYnEJzUZ" | "X5a4NftS4NxGXkoPStBrs" | "45suVW99wXZmhKQruO8Lme" | "6eGU3dzh9kiXR5n90mZgVN" | "lSSWizDYp3JQOTrT9Jmpi" | "30W6xGxvRZyFraQcXjojNy" | "nTOUJAPWlTSRDvEf5q5O3" | "7F22NiUUeufVbZr0mpTetn" | "1DwjIVJ3pFYzHYEZYlmCzB" | "5c256kPsJKNzqt5vp5yIcM" | "7FmYy5koR7SzrVie1bhDgi" | "5ouWXQfAjExsx3FMFLc1yq" | "52m7uUJaR1cTorbiQGATbS" | "6Bmjw1yK7FbS5wjbMjRTFj";
export type AssessmentResponse = {
    question_id: AssessmentQuestionId;
    score: number;
};
export type AssessmentResponses = {
    responses: AssessmentResponse[];
};
