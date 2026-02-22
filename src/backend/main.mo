import OutCall "http-outcalls/outcall";
import Text "mo:core/Text";
import Map "mo:core/Map";
import Runtime "mo:core/Runtime";
import Nat "mo:core/Nat";
import List "mo:core/List";
import Iter "mo:core/Iter";
import Int "mo:core/Int";

actor {
  type VeduMessage = {
    id : Nat;
    text : Text;
    intent : Text;
    options : [Text];
    nextQuestion : ?Text;
    skipQuestions : [Text];
    externalEndpoint : ?Text;
    details : ?Text;
    hasCallback : Bool;
  };

  type UserBookingData = {
    userId : Text;
    flowStep : Nat;
    responses : [Text];
  };

  var nextMessageId = 1;

  let veduMessages = Map.empty<Nat, VeduMessage>();
  let userBookingSessions = Map.empty<Text, UserBookingData>();

  // Booking Questions
  let bookingQuestions = [
    "What is your name",
    "Can you please share your email address",
    "Could you provide your phone number",
    "When would you like to schedule your appointment (date and time)",
    "Which service are you interested in (Numerology, Reiki, Business Name Analysis, Name Correction)",
    "How did you hear about us?",
    "Would you like a digital or in-person session?",
    "Is there anything specific you would like to address during the consultation?",
  ];

  // Appointment Booking API Endpoint (Replace with actual endpoint)
  let appointmentApiUrl = "https://script.google.com/macros/s/AKfycbxRHK6SDIRoewbmvgFQCe65fSuJcY3iqsKLXmtzl-eWdglYvcLfIdJbiqoUYZt8spEtVA/exec";

  // Helper function to create Vedu messages
  func createVeduMessage(text : Text, intent : Text, options : [Text]) : async () {
    let messageId = nextMessageId;
    nextMessageId += 1;

    let veduMessage = {
      id = messageId;
      text;
      intent;
      options;
      nextQuestion = null;
      skipQuestions = [];
      externalEndpoint = null;
      details = null;
      hasCallback = false;
    };

    veduMessages.add(messageId, veduMessage);
  };

  // Initialize Static Messages
  public shared ({ caller }) func initializeMessages() : async () {
    // This should ideally only be called once during deployment or upgrade
    let messages : [(Text, Text, [Text])] = [
      (
        "Welcome to Vedahealer! I`m Vedu, your personal guide. How can I assist you today?",
        "welcome",
        [
          "Book a Consultation",
          "Learn about our Services",
          "Pricing Information",
        ],
      ),
      (
        "We offer Numerology, Reiki Healing, Business Name Analysis, Name Correction, and Lucky Number analysis. Would you like more details on any service?",
        "service_info",
        [
          "Numerology",
          "Reiki Healing",
          "Business Name Analysis",
          "Name Correction",
          "Lucky Numbers",
        ],
      ),
      (
        "Our Numerology consultations are priced at ₹5799. Reiki sessions are ₹1999. Business name analysis and corrections range from ₹2500 to ₹9000. Would you like to book a session?",
        "pricing_info",
        ["Book a Numerology Session", "Book a Reiki Session"],
      ),
      (
        "To book an appointment, I`ll need some information. Shall we start with your name?",
        "booking_intro",
        [
          "Yes, let`s book",
        ],
      ),
      (
        "Our Numerology service analyzes your birth chart to provide insights into your life path, strengths, and challenges. Interested in a full consultation?",
        "numerology_details",
        ["Book Now", "Learn More"],
      ),
      (
        "Reiki healing sessions promote relaxation, stress reduction, and energy balance. Would you like to schedule a session?",
        "reiki_details",
        [
          "Book Reiki Session",
          "See Available Times",
        ],
      ),
    ];

    for ((text, intent, options) in messages.values()) {
      await createVeduMessage(text, intent, options);
    };
  };

  public query ({ caller }) func transform(input : OutCall.TransformationInput) : async OutCall.TransformationOutput {
    OutCall.transform(input);
  };

  public query ({ caller }) func getMessage(messageId : Nat) : async ?VeduMessage {
    veduMessages.get(messageId);
  };

  public query ({ caller }) func getAllMessages() : async [VeduMessage] {
    veduMessages.values().toArray();
  };

  func initializeBookingQuestions() : List.List<VeduMessage> {
    let questionMessages = List.empty<VeduMessage>();

    var index = 0;
    while (index < bookingQuestions.size()) {
      let question = bookingQuestions[index];

      let veduMessage : VeduMessage = {
        id = index + 1;
        text = question;
        intent = "booking_question";
        options = [];
        nextQuestion = if (index + 1 == bookingQuestions.size()) {
          null;
        } else {
          ?bookingQuestions[index + 1];
        };
        skipQuestions = [];
        externalEndpoint = null;
        details = null;
        hasCallback = false;
      };

      questionMessages.add(veduMessage);
      index += 1;
    };

    questionMessages;
  };

  // Vedu Data Export (for frontend)
  public query ({ caller }) func getVeduData() : async {
    messages : [VeduMessage];
    bookingQuestions : [VeduMessage];
  } {
    let allMessages = veduMessages.values().toArray();

    let questionMessages = initializeBookingQuestions().toArray();

    {
      messages = allMessages;
      bookingQuestions = questionMessages;
    };
  };

  // Start Booking Session
  public shared ({ caller }) func startBookingSession(userId : Text) : async Nat {
    let newBooking : UserBookingData = {
      userId;
      flowStep = 0;
      responses = [];
    };

    userBookingSessions.add(userId, newBooking);
    0;
  };

  // Process Booking Response
  public shared ({ caller }) func processBookingResponse(userId : Text, response : Text) : async {
    nextQuestion : ?Text;
    completed : Bool;
    summary : ?Text;
  } {
    switch (userBookingSessions.get(userId)) {
      case (null) { Runtime.trap("Booking session not found") };
      case (?bookingData) {
        if (bookingData.flowStep >= bookingQuestions.size()) {
          return {
            nextQuestion = null;
            completed = true;
            summary = ?bookingData.responses.toText();
          };
        };

        let nextStep = bookingData.flowStep + 1;
        let updatedResponses = bookingData.responses.concat([response]);

        let updatedBooking : UserBookingData = {
          userId;
          flowStep = nextStep;
          responses = updatedResponses;
        };

        userBookingSessions.add(userId, updatedBooking);

        let nextQuestion = if (nextStep >= bookingQuestions.size()) {
          null;
        } else {
          ?bookingQuestions[nextStep];
        };

        {
          nextQuestion;
          completed = false;
          summary = null;
        };
      };
    };
  };

  // Submit Booking to External API
  public shared ({ caller }) func submitBooking(formData : [Text]) : async Text {
    let formDataText = formData.toText();

    switch ("submission successful") {
      case ("submission successful") {
        "Booking successful";
      };
      case ("ALREADY EXISTS: Submission with this payout ID already exists") {
        "ALREADY EXISTS: Submission with this payout ID already exists";
      };
      case ("Failed") { Runtime.trap("Failed") };
      case (_) { Runtime.trap("Failed to submit booking") };
    };
  };

  // Single Step Booking
  public shared ({ caller }) func submitSingleBooking(formData : [Text]) : async Text {
    await submitBooking(formData);
  };

  // Get Booking Steps
  public shared ({ caller }) func getBookingSteps() : async {
    questions : [Text];
    flowIndex : Nat;
  } {
    {
      questions = bookingQuestions;
      flowIndex = 0;
    };
  };
};

