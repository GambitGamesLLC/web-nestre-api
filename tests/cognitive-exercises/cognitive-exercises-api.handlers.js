/**
 * cognitive-exercises-api.handlers.js
 * @file Mock Service Worker (MSW) handlers for API request interception.
 * @description This file uses the `msw` library to intercept HTTP requests and return mock data. 
 * This is essential for unit testing API client functions without making actual network calls, 
 * ensuring tests are fast and reliable.
 * @requires {msw}
 * @exports {HttpHandler[]} handlers
 */

//Not included in unit testing code coverage

//#region IMPORTS

//Import the msw (mock-service-worker) package so we can fake our Api responses
import { http, HttpResponse } from 'msw';

//Import the BASE_URL from our environment-variables.js
import { API_BASE_URL } from '../../examples/environment-variables.js';

//Import the API_VERSION from our environment-variables.js
import { API_VERSION } from '../../examples/environment-variables.js';

//Import the USER_ID from our environment-variables.js
import { USER_ID } from '../../examples/environment-variables.js';

//Import the USER_EMAIL from our environment-variables.js
import { USER_EMAIL } from '../../examples/environment-variables.js';

/**
 * @typedef {import('../../src/cognitive-exercises/cognitive-exercises-types.js').CognitiveExercisesRecommendation } CognitiveExercisesRecommendation
 * @typedef {import('../../src/cognitive-exercises/cognitive-exercises-types.js').CognitiveExerciseRecord } CognitiveExerciseRecord
 * @typedef {import('../../src/cognitive-exercises/cognitive-exercises-types.js').RecordExerciseInteractionConfirmationMessage } RecordExerciseInteractionConfirmationMessage
 * @typedef {import('../../src/cognitive-exercises/cognitive-exercises-types.js').UserProgressForExercise } UserProgressForExercise
 * @typedef {import('../../src/cognitive-exercises/cognitive-exercises-types.js').CogexId } CogexId
 * @typedef {import('../../src/cognitive-exercises/cognitive-exercises-types.js').InteractionsForCurrentSession } InteractionsForCurrentSession
 * @typedef {import('../../src/cognitive-exercises/cognitive-exercises-types.js').CurrentStatisticsForExercises } CurrentStatisticsForExercises
 * @typedef {import('../../src/cognitive-exercises/cognitive-exercises-types.js').CurrentRoundStatisticsForExercise } CurrentRoundStatisticsForExercise
 * @typedef {import('../../src/cognitive-exercises/cognitive-exercises-types.js').NBackDifficulty } NBackDifficulty
 * @typedef {import('../../src/cognitive-exercises/cognitive-exercises-types.js').NBackSequence } NBackSequence
 * @typedef {import('../../src/cognitive-exercises/cognitive-exercises-types.js').NBackFrame } NBackFrame
 * @typedef {import('../../src/cognitive-exercises/cognitive-exercises-types.js').CatchMeDifficulty } CatchMeDifficulty
 * @typedef {import('../../src/cognitive-exercises/cognitive-exercises-types.js').CatchMeSequence } CatchMeSequence
 * @typedef {import('../../src/cognitive-exercises/cognitive-exercises-types.js').CatchMeVersion } CatchMeVersion
 * @typedef {import('../../src/cognitive-exercises/cognitive-exercises-types.js').CatchMeCriteriaType } CatchMeCriteriaType
 * @typedef {import('../../src/cognitive-exercises/cognitive-exercises-types.js').SalienceDifficulty } SalienceDifficulty
 * @typedef {import('../../src/cognitive-exercises/cognitive-exercises-types.js').SalienceSequence } SalienceSequence
 * @typedef {import('../../src/cognitive-exercises/cognitive-exercises-types.js').SalienceVersion } SalienceVersion
 * @typedef {import('../../src/cognitive-exercises/cognitive-exercises-types.js').ImpulseDifficulty } ImpulseDifficulty
 * @typedef {import('../../src/cognitive-exercises/cognitive-exercises-types.js').ImpulseSequence } ImpulseSequence
 * @typedef {import('../../src/cognitive-exercises/cognitive-exercises-types.js').ImpulseVersion } ImpulseVersion
 */

//#endregion

//#region MOCK SERVICE WORKERS - CREATE HANDLER[]

/**
 * Handler used to define our rules for what http call to intercept and what to do with them
 * @type{HttpHandler[]}
 */
export let handlers = [];

//#endregion

//#region MOCK SERVICE WORKERS - GET NBACK SEQUENCE

/** 
 * @type {NBackSequence} 
 **/
const mockNBackSequence = [
    [1], [2], [3, 4], [1], [2]
];

handlers.push
(
    http.get(`${API_BASE_URL}/v${API_VERSION}/user/${USER_ID}/cogex/nback/sequence`, ({request}) => {
        return HttpResponse.json(mockNBackSequence, { status: 200 });
    })
);

//#endregion

//#region MOCK SERVICE WORKERS - GET CATCH ME SEQUENCE

/** @type {CatchMeSequence} */
const mockCatchMeSequence = ["113", "213", "313", "413", "113", "213", "313"];

handlers.push
(
    http.get(`${API_BASE_URL}/v${API_VERSION}/user/${USER_ID}/cogex/catchme/sequence`, ({request}) => {
        return HttpResponse.json(mockCatchMeSequence, { status: 200 });
    })
);

//#endregion

//#region MOCK SERVICE WORKERS - GET COGNITIVE EXERCISES RECOMMENDATION

/**
 * @type {CognitiveExercisesRecommendation}
 */
const mockCogexRecommendation = {
    cognitive_exercises: 
    [
        {
            cogex_id: "IMPULSE-1",
            version: "alpha",
            is_available: true,
            completed_today: false
        },
        {
            cogex_id: "ATTENTION-1",
            version: null,
            is_available: false,
            completed_today: false
        },
        {
            cogex_id: "SALIENCE-1",
            version: null,
            is_available: false,
            completed_today: false
        },
        {
            cogex_id: "MEMORY-1",
            version: null,
            is_available: false,
            completed_today: false
        }
    ]
};

handlers.push(
    http.get(`${API_BASE_URL}/v${API_VERSION}/user/${USER_ID}/cogex`, () => {
        return HttpResponse.json(mockCogexRecommendation, { status: 200 });
    })
);

//#endregion

//#region MOCK SERVICE WORKERS - RECORD COGNITIVE EXERCISE INTERACTION

handlers.push(
    http.post(`${API_BASE_URL}/v${API_VERSION}/user/${USER_ID}/cogex/interaction`, async ({ request }) => {
        /** @type {RecordExerciseInteractionConfirmationMessage} */
        const mockConfirmation = "Interaction recorded successfully.";
        return HttpResponse.json(mockConfirmation, { status: 200 });
    })
);

//#endregion

//#region MOCK SERVICE WORKERS - GET CURRENT LEVEL FOR COGNITIVE EXERCISE

handlers.push(
    http.get(`${API_BASE_URL}/v${API_VERSION}/user/${USER_ID}/cogex/:cogexId/progress`, ({ params }) => {
        const { cogexId } = params;
        /** @type {UserProgressForExercise} */
        const mockProgress = {
            cogex_id: cogexId,
            current_level: 5,
            current_round: 2,
            is_baseline_training: false,
            completed_today: true
        };
        return HttpResponse.json(mockProgress, { status: 200 });
    })
);

//#endregion

//#region MOCK SERVICE WORKERS - GET CURRENT SESSION INTERACTIONS

handlers.push(
    http.get(`${API_BASE_URL}/v${API_VERSION}/user/${USER_ID}/cogex/:cogexId/interactions-for-current-session`, ({ params }) => {
        const { cogexId } = params;
        /** @type {InteractionsForCurrentSession} */
        const mockInteractions = {
            created_at: "2023-10-27T10:00:00Z",
            cogex_id: cogexId,
            user_id: USER_ID,
            context: "daily_workout",
            version: "alpha",
            level: 1,
            round_number: 1,
            correct_assertiveness: 10,
            incorrect_assertiveness: 2,
            correct_prudence: 8,
            incorrect_prudence: 1,
            no_answer: 1,
            average_reaction_time_correct: 500.5,
            average_reaction_time_incorrect: 750.2,
            score: "95",
            interaction_duration: 120.5,
            user_subscription_level_id: 1,
            id: "some-interaction-id",
            is_baseline_round: false
        };
        return HttpResponse.json(mockInteractions, { status: 200 });
    })
);

//#endregion

//#region MOCK SERVICE WORKERS - GET CURRENT EXERCISE STATISTICS

handlers.push(
    http.get(`${API_BASE_URL}/v${API_VERSION}/user/${USER_ID}/cogex/stats`, () => {
        /** @type {CurrentStatisticsForExercises} */
        const mockStats = {
            current_statistics: [
                { exercise_id: "IMPULSE-1", average_accuracy: "92.5%", highest_accuracy: "98.0%", average_speed: "550ms", fastest_speed: "400ms", level_improvement: "+2", workout_improvement: "+5%" },
                { exercise_id: "ATTENTION-1", average_accuracy: "88.0%", highest_accuracy: "95.0%", average_speed: "600ms", fastest_speed: "450ms", level_improvement: "+1", workout_improvement: "+3%" }
            ]
        };
        return HttpResponse.json(mockStats, { status: 200 });
    })
);

//#endregion

//#region MOCK SERVICE WORKERS - GET CURRENT ROUND EXERCISE STATISTICS

handlers.push(
    http.get(`${API_BASE_URL}/v${API_VERSION}/user/${USER_ID}/cogex/stats/:cogexId`, () => {
        /** @type {CurrentRoundStatisticsForExercise} */
        const mockStats = {
            current_round_statistics: [
                { level: 1, accuracy: "90%", speed: "500ms" },
                { level: 2, accuracy: "92%", speed: "480ms" }
            ]
        };
        return HttpResponse.json(mockStats, { status: 200 });
    })
);

//#endregion

//#region MOCK SERVICE WORKERS - GET NBACK DIFFICULTY

handlers.push(
    http.get(`${API_BASE_URL}/v${API_VERSION}/user/${USER_ID}/cogex/nback/difficulty`, ({request}) => {
        /** @type {NBackDifficulty} */
        const mockDifficulty = { level_progression_score: 80, level_progression_sessions: 3, n_back: 2, num_objects: 8 };
        return HttpResponse.json(mockDifficulty, { status: 200 });
    })
);

//#endregion

//#region MOCK SERVICE WORKERS - GET CATCHME DIFFICULTY

handlers.push(
    http.get(`${API_BASE_URL}/v${API_VERSION}/user/${USER_ID}/cogex/catchme/difficulty`, ({request}) => {
        /** @type {CatchMeDifficulty} */
        const mockDifficulty = { level_progression_score: 90, level_progression_sessions: 2, insect_lifetime: 2000, spawn_rate: 1000, synchronous_spawns: 2 };
        return HttpResponse.json(mockDifficulty, { status: 200 });
    })
);

//#endregion

//#region MOCK SERVICE WORKERS - GET SALIENCE DIFFICULTY

handlers.push(
    http.get(`${API_BASE_URL}/v${API_VERSION}/user/${USER_ID}/cogex/salience/difficulty`, ({request}) => {
        /** @type {SalienceDifficulty} */
        const mockDifficulty = { level_progression_score: 85, level_progression_sessions: 2, sample_exposure: 1500, multispawn_exposure: 3000 };
        return HttpResponse.json(mockDifficulty, { status: 200 });
    })
);

//#endregion

//#region MOCK SERVICE WORKERS - GET SALIENCE SEQUENCE

handlers.push(
    http.get(`${API_BASE_URL}/v${API_VERSION}/user/${USER_ID}/cogex/salience/sequence`, ({request}) => {
        /** @type {SalienceSequence} */
        const mockSequence = [ { "shape": ["1132", "2134", "1313"] }, { "color": ["2214", "2231", "1214"] } ];
        return HttpResponse.json(mockSequence, { status: 200 });
    })
);

//#endregion

//#region MOCK SERVICE WORKERS - GET IMPULSE DIFFICULTY

handlers.push(
    http.get(`${API_BASE_URL}/v${API_VERSION}/user/${USER_ID}/cogex/impulse/difficulty`, ({request}) => {
        /** @type {ImpulseDifficulty} */
        const mockDifficulty = { level_progression_score: 85, level_progression_sessions: 2, spawn_rate: 1000, start_speed: 1.5, fall_speed: 0.1 };
        return HttpResponse.json(mockDifficulty, { status: 200 });
    })
);

//#endregion

//#region MOCK SERVICE WORKERS - GET IMPULSE SEQUENCE

handlers.push(
    http.get(`${API_BASE_URL}/v${API_VERSION}/user/${USER_ID}/cogex/impulse/sequence`, ({request}) => {
        /** @type {ImpulseSequence} */
        const mockSequence = [ ["11b"],["23b"],["41w","22w"],["11b","21w"],["14b"],["33w"],["31b","13b"] ];
        return HttpResponse.json(mockSequence, { status: 200 });
    })
);

//#endregion