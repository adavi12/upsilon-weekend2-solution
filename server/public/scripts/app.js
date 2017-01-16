var people = [];
var currentPerson = 0;
var timerID = null;

$(document).ready(function(){

  // event listeners
  $("#next").on("click", nextPerson);
  $("#prev").on("click", prevPerson);

  // start
  getData();

  function getData() {
    $.ajax({
      type: "GET",
      url: "/data",
      success: function(data){
        // store data from server in a global for use later
        people = data;
        createTracker();
        showPerson();
        startTimer();
      }
    });
  }

  function showPerson() {
    // console.log('people data ', people);
    var person = people[currentPerson];

    // populate DOM with person's data
    $("#name").text(person.name);
    $("#github").attr("href", "https://github.com/" + person.githubUserName);
    $("#github").text(person.githubUserName);
    $("#shoutout").text(person.shoutout);

    // show container
    $("#peopleContainer").fadeIn();

  }

  function createTracker() {
    console.log('creating tracker');
    people.forEach(function(person, i) {
      var index = i + 1;
      $("#trackerContainer").append('<li>' + index + '</li>');
      // using data would look like this
      // this would store the person's index on this DOM element
      // we could then pull the value off later by selecting the element
      // $("#trackerContainer").children().last().data("id", i);
    });
    updateTracker();
  }

  function updateTracker() {
    // console.log('selected tracker: ', $("#trackerContainer").children());
    $("#trackerContainer").children().each(function(i, item) {
      // console.log('item number: ', i);
      if(currentPerson == i) {
        $(this).addClass("currentPerson");
      } else {
        $(this).removeClass("currentPerson");
      }
    });
  }

  function nextPerson() {
    console.log('clicked next');
    $("#peopleContainer").fadeOut(500, function() {
      // wait until the animation finishes to show the next person
      currentPerson++;
      if(currentPerson >= people.length) {
        currentPerson = 0;
      }
      updateTracker();
      showPerson();
      resetTimer();
    });
  }

  function prevPerson() {
    console.log('clicked previous');
    $("#peopleContainer").fadeOut(500, function() {
      // wait until the animation finishes to show the previous person
      currentPerson--;
      if(currentPerson < 0) {
        currentPerson = people.length - 1;
      }
      updateTracker();
      showPerson();
      resetTimer();
    });
  }

  function startTimer() {
    timerID = setInterval(nextPerson, 5000);
  }

  function resetTimer() {
    console.log('reset timer');
    clearInterval(timerID);
    startTimer();
  }

});
