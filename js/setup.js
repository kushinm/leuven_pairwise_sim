

function setupGame(pairdata) {
  let pairs = pairdata;





  const jsPsych = initJsPsych({
    show_progress_bar: true,
    default_iti: 150,
    on_finish: function () {return jsPsych.data.get().localSave('csv','mydata.csv')}
  });

  const subject_id = jsPsych.randomization.randomID(10);
  const filename = `${subject_id}.csv`;
  jsPsych.data.addProperties({subjectID: subject_id});


  pairsList = Object.values(pairs)
  pairsList = pairsList.slice(0,10);
  sampledPairs = jsPsych.randomization.sampleWithReplacement(pairsList, pairsList.length)

  var timelinePairs = [
    _.map(sampledPairs, function (i) { return { pair: i } })
  ]
  console.log(timelinePairs)

  let judgement_trial = {
    type: jsPsychSurveyLikert,
    save_trial_parameters:{questions:true},
    questions: [
      {
        prompt: function(){
        //do a random coin toss to decide which order to present the pair in
        let coin = Math.random()
        if (coin < 0.5){
          return `How similar are these two things?: \n <b>'${ jsPsych.timelineVariable('pair',true)[0]}'</b> and\
         <b>'${ jsPsych.timelineVariable('pair',true)[1]}'</b>`
        }
        else {
          return `How similar are these two things?: \n <b>'${ jsPsych.timelineVariable('pair',true)[1]}'</b> and\
          <b>'${ jsPsych.timelineVariable('pair',true)[0]}'</b>`
        }},
       
        labels: [
          "1: Extremely dissimilar",
          "2: Very dissimilar", 
          "3: Likely dissimilar", 
          "4: Neutral", 
          "5: Likely similar",
          "6: Very similar",
          "7: Extremely similar"
        ]
      }
    ]
    // ,
    // concept: jsPsych.timelineVariable('concept'),
    // png_path: jsPsych.timelineVariable('png_path'),
    // uniqueID: jsPsych.timelineVariable('uniqueID'),
    // filename: jsPsych.timelineVariable('filename'),
    // currentTrial: jsPsych.timelineVariable('trial_num'),
    // abstraction: jsPsych.timelineVariable('abstraction'),
    // num_strokes: jsPsych.timelineVariable('num_strokes'),
    // filename_recog:jsPsych.timelineVariable('filename_recog'),
    
    // min_bar:1,
    // canvas_size:'300px',
    // totalTrials: total_trials,
    // show_trial_count: true,
    // on_finish: main_on_finish
  };

  let begin = {
    type: jsPsychInstructions,
    pages: ['Thank you for participating in this study! In this experiment you will be asked to rate how similar pairs of objects are. We expect an average\
    session to last 30 minutes including time taken to read the instructions. For your participation in this study, you will be paid $3.62. We recommend using Chrome.',
    'By completing this session, you are participating in a study being \
    performed by cognitive scientists at UW Madison.<br> If you have questions about this \
    research, please contact the <b>Knowledge and Concepts Lab</b> at <b> \
    <a href="mailto://kclab@psych.wisc.edu">kclab@psych.wisc.edu</a></b>.<br> \
    You must be at least 18 years old to participate. There are neither specific benefits \
    nor anticipated risks associated with participation in this study. \
    Your participation in this research is voluntary. You may decline to answer any \
    or all of the following questions. You may decline further participation, \
    at any time, without adverse consequences. Your anonymity is assured; the researchers \
    who have requested your participation will not reveal any personal information about you.',
    'We are about to begin the experiment.<br> On each trial you will be presented with a pair of words in <b> bold </b>. You will be asked to rate how similar the objects are. <br>The ratings\
    are on a scale from\
    1 to 7, where 1 is ‘extremely dissimilar’, 2 is ‘very dissimilar’, 3 is ‘likely dissimilar’, 4 is ‘neutral’, 5 is ‘likely similar’, 6 is ‘very similar’, and 7 is ‘extremely similar’.<br> \
    Although some comaprisons might seem strange, please use your best judgement to provide a rating. When you complete each rating trial, a "Continue" button will appear to allow you to progress.<br>\
    There are 435 trials in total. Please do not refresh the page or close the browser window during the experiment.'],
    show_clickable_nav: true,
    show_page_number: true,
    allow_backward: true,
    button_label_previous: 'Previous',
    button_label_next: 'Next',
  
   
  }

  let trial = {
    timeline: [judgement_trial],
    timeline_variables: _.flatten(timelinePairs),
  };

  let goodbye = {
    type: jsPsychInstructions,
    pages: [
      'Congrats! You are all done. Thanks for participating in our study! \
          Click NEXT to submit this study.'
    ],
    show_clickable_nav: true,
    allow_backward: false,
  }


  const save_data = {
    type: jsPsychPipe,
    action: "save",
    experiment_id: "X5vnr45k3PSu",
    filename: filename,
    data_string: ()=>jsPsych.data.get().csv()
  };

  let timeline = [];
  timeline.push(begin);
  timeline.push(trial);
  timeline.push(goodbye);
  timeline.push(save_data);
  jsPsych.run(timeline);
}