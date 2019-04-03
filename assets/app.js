// Initialize Firebase
var config = {
    apiKey: "AIzaSyA6SonLVamhy3jgRkKBWqAunQbUfFP-1aw",
    authDomain: "train-6861c.firebaseapp.com",
    databaseURL: "https://train-6861c.firebaseio.com",
    projectId: "train-6861c",
    storageBucket: "train-6861c.appspot.com",
    messagingSenderId: "769684584575"
};
firebase.initializeApp(config);

var database = firebase.database();

//   Create click function to grab value from input box=====================================================
$("#add-train-btn").on("click", function (event) {
    event.preventDefault();

    var trainInput = $("#train-input").val().trim();
    var destinationInput = $("#destination-input").val().trim();
    var frequencyInput = $("#frequency-input").val().trim();
    var firstTrainInput1 = $("#first-train-time-input1").val().trim();
    var firstTrainInput2 = $("#first-train-time-input2").val().trim();
    var firstTrainInput3 = $("#first-train-time-input3").val().trim();

    var firstTrainInput = firstTrainInput1 + firstTrainInput2 + firstTrainInput3;



    // Creates local object to hold train data
    var newTrain = {
        name: trainInput,
        destination: destinationInput,
        firstTrain: firstTrainInput,
        frequency: frequencyInput,
        dateAdded: firebase.database.ServerValue.TIMESTAMP
    };
    // Uploads train data to the database
    database.ref().push(newTrain);



});

// 3. Create Firebase event to add train data to the database 
database.ref().on("child_added", function (childSnapshot) {
    var trainInput = childSnapshot.val().name;
    var destinationInput = childSnapshot.val().destination;
    var frequencyInput = childSnapshot.val().frequency;
    var firstTrain = childSnapshot.val().firstTrain;

    // Calculate the train time
    var startTimeConverted = moment(firstTrain, "hh:mm");
    var timeDiff = moment().diff(moment(startTimeConverted), "minutes");
    var timeRemain = timeDiff % childSnapshot.val().frequency;
    var minAway = childSnapshot.val().frequency - timeRemain;
    var nextTrain = moment().add(minAway, "minutes");



    // Create table row to disply on html
    var newRow = $("<tr>").append(
        $("<td>").text(trainInput),
        $("<td>").text(destinationInput),
        $("<td>").text(frequencyInput),
        $("<td>").text(moment(nextTrain).format("LT")),
        $("<td>").text(minAway)
    );

    $("#train-table > tbody").append(newRow);
});
























