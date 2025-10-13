export type CognitiveExercisesRecommendation = {
    cogex_id: string;
    version: string;
    is_available: boolean;
    completed_today: boolean;
};
export type CognitiveExerciseRecord = {
    cogex_id: string;
    user_id: string;
    context: string;
    version: string;
    level: number;
    round_number: number;
    correct_assertiveness: number;
    incorrect_assertiveness: number;
    correct_prudence: number;
    incorrect_prudence: number;
    no_answer: number;
    average_reaction_time_correct: number;
    average_reaction_time_incorrect: number;
    score: number;
    interaction_duration: number;
    user_subscription_level_id: number;
};
/**
 * A confirmation message string returned upon successfully recording a cognitive exercise interaction.
 */
export type RecordExerciseInteractionConfirmationMessage = string;
/**
 * Enum for cognitive exercise IDs.
 */
export type CogexId = "ATTENTION-1" | "IMPULSE-1" | "SALIENCE-1" | "MEMORY-1";
export type UserProgressForExercise = {
    cogex_id: string;
    current_level: number;
    current_round: number;
    is_baseline_training: boolean;
    completed_today: boolean;
};
export type InteractionsForCurrentSession = {
    created_at: string;
    cogex_id: string;
    user_id: string;
    context: string;
    version: string;
    level: number;
    round_number: number;
    correct_assertiveness: number;
    incorrect_assertiveness: number;
    correct_prudence: number;
    incorrect_prudence: number;
    no_answer: number;
    average_reaction_time_correct: number;
    average_reaction_time_incorrect: number;
    score: string;
    interaction_duration: number;
    user_subscription_level_id: number;
    id: string;
    is_baseline_round: boolean;
};
export type CurrentStatisticsForExercise = {
    exercise_id: string;
    average_accuracy: string;
    highest_accuracy: string;
    average_speed: string;
    fastest_speed: string;
    level_improvement: string;
    workout_improvement: string;
};
export type CurrentStatisticsForExercises = {
    current_statistics: CurrentStatisticsForExercise[];
};
export type CurrentRountStatisticsForExercise = {
    level: number;
    accuracy: string;
    speed: string;
};
export type CurrentRoundStatisticsForExercise = {
    current_round_statistics: CurrentRountStatisticsForExercise[];
};
export type NBackDifficulty = {
    level_progression_score: number;
    level_progression_sessions: number;
    n_back: number;
    num_objects: number;
};
/**
 * A single frame/exposure in an N-Back sequence.
 * It contains one or two numbers, each representing a shape (integer from 1 to 4).
 */
export type NBackFrame = number[];
/**
 * Represents a sequence for the N-Back exercise, returned as a list of frames/exposures.
 */
export type NBackSequence = NBackFrame[];
/**
 * Enum for NBACK versions.
 */
export type NBackVersion = "alpha" | "cerebral" | "prime";
export type CatchMeDifficulty = {
    level_progression_score: number;
    level_progression_sessions: number;
    insect_lifetime: number;
    spawn_rate: number;
    synchronous_spawns: number;
};
/**
 * A list of strings representing the sequence of insects that will be spawned.
 * Each element represents a tuple of species, color, and size.
 * For example ["113", "213", "313", "413", "113", "213", "313"].
 */
export type CatchMeSequence = string[];
/**
 * Enum for CATCHME versions.
 */
export type CatchMeVersion = "alpha" | "cerebral" | "prime";
/**
 * Enum for CATCHME criteria type.
 */
export type CatchMeCriteriaType = "assertiveness" | "prudence";
export type SalienceDifficulty = {
    level_progression_score: number;
    level_progression_sessions: number;
    sample_exposure: number;
    multispawn_exposure: number;
};
/**
 * A list of trials for a round in the Salience game.
 * Each trial in the list is an object where keys are the trial type (e.g. "shape", "color", "size"),
 * and the value is a list of strings of the form `["1132", "2134", "2313"]`.
 * Each string in the list represents an object in the frame, and each digit represents a property
 * like shape, number of shapes, color, and size, in that order.
 * The first string in the list is the example object.
 */
export type SalienceSequence = Array<{
    [x: string]: string[];
}>;
export type SalienceVersion = "alpha" | "cerebral";
export type ImpulseDifficulty = {
    level_progression_score: number;
    level_progression_sessions: number;
    spawn_rate: number;
    start_speed: number;
    fall_speed: number;
};
/**
 * Each element in the sequence is a list containing between 1 and max_synchronous_spawns.
 * Each String is 2 digit number followed by the character "w" or "b".
 * Each digit is between 1 and num_colors and represents a color.
 * The first digit represents the semantic color and the second digit represents the visual color.
 *
 * Example: [["11b"],["23b"],["41w","22w"],["11b","21w"],["14b"],["33w"],["31b","13b"],...]
 */
export type ImpulseSequence = string[][];
/**
 * Enum for IMPULSE versions.
 */
export type ImpulseVersion = "alpha" | "cerebral" | "prime";
