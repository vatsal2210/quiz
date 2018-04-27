var constants = {

    SAVE_USER_INFO: "INSERT INTO mst_user(name, email, created_at) VALUES (?,?,?)",

    //GET_QUIZ_QUESTION_DETAILS: "select a.id, a.question, GROUP_CONCAT(b.answer_id) as answer_id, GROUP_CONCAT(b.answer) as answer from mst_questions a left join question_options_mapping b on a.id=b.question_id group by b.question_id order by a.id",

    GET_QUIZ_QUESTION_DETAILS: "SELECT id, question from mst_questions",

    GET_OPTIONS_DETAILS: "SELECT answer_id, answer from question_options_mapping WHERE question_id=?",

    CHECK_ANSWER: "SELECT score from mst_questions WHERE id=? and answer_id=?",

    responseCode: {        
        INTERNAL_SERVER_ERROR: {
            code: 501,
            message: 'Internal server error'
        },
        NOT_FOUND: {
            code: 401,
            message: 'Not found'
		},		        
        SUCCESS: {
            code: 200,
            message: 'success'
        },	
        ALL_FIELD_REQUIRE: {
            code: 401,
            message: 'All Field are required'
        }	
    }
}

module.exports = constants;