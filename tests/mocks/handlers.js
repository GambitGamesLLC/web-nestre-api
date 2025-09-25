/**
 * handlers.js (aggregator)
 * @file Mock Service Worker (MSW) handlers for API request interception.
 * @description This file uses the `msw` library to intercept HTTP requests and return mock data. 
 * This is essential for unit testing API client functions without making actual network calls, 
 * ensuring tests are fast and reliable.
 * @requires {msw}
 * @exports {HttpHandler[]} handlers
 */

//Not included in unit testing code coverage

//#region IMPORTS
import { handlers as assessmentHandlers } from '../assessment/assessment-api.handlers.js';
import { handlers as assessmentSearchHandlers } from '../assessment-search/assessment-search-api.handlers.js';
import { handlers as cognitiveExercisesHandlers } from '../cognitive-exercises/cognitive-exercises-api.handlers.js';
import { handlers as contentInteractionHandlers } from '../content-interaction/content-interaction-api.handlers.js';
import { handlers as contentRecommendationsHandlers } from '../content-recommendations/content-recommendations-api.handlers.js';
import { handlers as dailyWorkoutHandlers } from '../daily-workout/daily-workout-api.handlers.js';
import { handlers as developmentHandlers } from '../development/development-api.handlers.js';
import { handlers as frameItHandlers } from '../frame-it/frame-it-api.handlers.js'; 
import { handlers as lookupHandlers } from '../lookup/lookup-api.handlers.js';
import { handlers as mentalFramingHandlers } from '../mental-framing/mental-framing-api.handlers.js';
import { handlers as nestreApiManagerHandlers } from '../nestre-api-manager/nestre-api-manager.handlers.js';
import { handlers as organizationHandlers } from '../organization/organization-api.handlers.js';
import { handlers as userHandlers } from '../user/user-api.handlers.js';
import { handlers as userSearchHandlers } from '../user-search/user-search-api.handlers.js';
import { handlers as utilityHandlers } from '../utility/utility-api.handlers.js';
//#endregion

//#region MOCK SERVICE WORKERS - CREATE HANDLER[]

/**
 * Handler used to define our rules for what http call to intercept and what to do with them
 * @type{HttpHandler[]}
 */
export let handlers = [
  ...assessmentHandlers,
  ...assessmentSearchHandlers,
  ...cognitiveExercisesHandlers,
  ...contentInteractionHandlers,
  ...contentRecommendationsHandlers,
  ...dailyWorkoutHandlers,
  ...developmentHandlers,
  ...frameItHandlers,
  ...lookupHandlers,
  ...mentalFramingHandlers,
  ...nestreApiManagerHandlers,
  ...organizationHandlers,
  ...userHandlers,
  ...userSearchHandlers,
  ...utilityHandlers
];

//#endregion


