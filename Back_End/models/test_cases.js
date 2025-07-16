const mongoose = require('mongoose');

const {Schema} = require('mongoose')

//define a schema
const TestCaseSchema = mongoose.Schema({
  questionId: { type: Schema.Types.ObjectId, ref: 'question' },
  input: String,
  expectedOutput: String
});

const tests = mongoose.model('test_case',TestCaseSchema);
module.exports = tests;