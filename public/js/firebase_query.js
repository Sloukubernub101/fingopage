var firebaseConfig = {
    apiKey: "AIzaSyCybdtq8DVhQQBmo8txvdaamQKxhr_JQcg",
    authDomain: "fingo-app-00001.firebaseapp.com",
    databaseURL: "https://fingo-app-00001.firebaseio.com",
    projectId: "fingo-app-00001",
    storageBucket: "fingo-app-00001.appspot.com",
    messagingSenderId: "843677860849",
    appId: "1:843677860849:web:8b78bdfbb396bdbd897a50",
    measurementId: "G-QJLDDDH2HT"
};
// Initialize Firebase
var defaultProject = firebase.initializeApp(firebaseConfig);
firebase.analytics();
var db = defaultProject.firestore();

$(document).ready(function () {
    $("#closeCookieConsent, .cookieConsentOK").click(function () {
        $("#cookieConsent").fadeOut(200);
    });
});

function readFireStore() {
    var ipV4 = '';

    $.getJSON('https://geolocation-db.com/json/', function (data) {
        console.log(data)
        ipV4 = data.IPv4;
        db.collection("hitcount").doc('joining').update(data).then(function (docRef) {
            console.log("Document written with ID: ", docRef);
        })
            .catch(function (error) {
                console.error("Error adding document: ", error);
            });
    });

    db.collection("hitcount").doc('visit').onSnapshot(function (doc) {
        console.log(" data: ", doc.data());
        document.getElementById('visitors').innerText = doc.data().count;
    });

    db.collection("hitcount").doc('joining').onSnapshot(function (doc) {
        if (doc.data().IPv4 === ipV4) {

        } else {

            document.getElementById("cookieConsent2").innerText = 'Seseorang menyertai dari ' + doc.data().city + ', ' + doc.data().state;

            $(document).ready(function () {
                setTimeout(function () {
                    $("#cookieConsent").fadeIn(200);
                }, 4000);
            });



        }
        document.getElementById('visitors').innerText = doc.data().count;
    });


    db.collection("hitcount").doc('visit').get().then(function (doc) {
        if (doc.exists) {
            console.log("Document data:",);
            db.collection("hitcount").doc('visit').update({
                count: doc.data().count + 1,
            }).then(function (docRef) {
                console.log("Document written with ID: ", docRef);
            })
                .catch(function (error) {
                    console.error("Error adding document: ", error);
                });
        } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
        }
    }).catch(function (error) {
        console.log("Error getting document:", error);
    });

}

function myFunction() {
    // Get the snackbar DIV
    var x = document.getElementById("snackbar");

    // Add the "show" class to DIV
    x.className = "show";

    // After 3 seconds, remove the show class from DIV
    setTimeout(function () {
        x.className = x.className.replace("show", "");
    }, 3000);
}