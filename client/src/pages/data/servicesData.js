import {
  FaComments,
  FaStar,
  FaSearch,
  FaBrain,
  FaHeart,
  FaPrayingHands,
} from "react-icons/fa";

const servicesData = {
  counselling: {
    slug: "counselling",
    title: "Counselling",
    shortTitle: "Counselling",
    icon: FaComments,

    tagline: "A safe space to understand, express and transform.",

    description:
      "Our counselling service provides a confidential and supportive environment where individuals can explore their thoughts, emotions, relationships and life challenges with greater clarity.",

    longDescription:
      "Life can sometimes bring emotional confusion, relationship difficulties, stress, uncertainty and situations that feel difficult to handle alone. Our counselling approach focuses on creating a compassionate space where you can express yourself freely, understand your experiences and work towards meaningful personal growth.",

    benefits: [
      "Emotional support and self-understanding",
      "Better management of stress and life challenges",
      "Improved interpersonal and relationship understanding",
      "Greater clarity in decision-making",
      "Development of healthy coping strategies",
      "A confidential and non-judgmental space",
    ],

    areas: [
      "Personal counselling",
      "Emotional concerns",
      "Relationship guidance",
      "Life transitions",
      "Stress management",
      "Personal growth",
    ],

    quote:
      "Understanding yourself is often the first step towards transforming your life.",

    colorClass: "service-counselling",
  },

  "astrological-consultancy": {
    slug: "astrological-consultancy",
    title: "Astrological Consultancy",
    shortTitle: "Astrological Consultancy",
    icon: FaStar,

    tagline: "Explore life's patterns through the wisdom of astrology.",

    description:
      "Our astrological consultancy offers personalised guidance using astrological perspectives to help individuals reflect upon different areas of life and gain a deeper understanding of their circumstances.",

    longDescription:
      "Astrology has traditionally been used as a system of reflection and interpretation. Our consultancy approaches astrology as a tool for gaining perspective, exploring patterns and considering possibilities in different areas of life.",

    benefits: [
      "Personalised astrological consultation",
      "Greater reflection on life patterns",
      "Guidance during periods of uncertainty",
      "Perspective on personal and professional matters",
      "Better understanding of strengths and challenges",
      "Individual-focused consultation",
    ],

    areas: [
      "Personal astrology",
      "Career and professional guidance",
      "Relationship perspectives",
      "Life transitions",
      "Decision-making support",
      "General astrological consultation",
    ],

    quote:
      "Sometimes a different perspective helps us see our path with greater clarity.",

    colorClass: "service-astrology",
  },

  "paranormal-investigator": {
    slug: "paranormal-investigator",
    title: "Paranormal Investigator",
    shortTitle: "Paranormal Investigator",
    icon: FaSearch,

    tagline: "Explore unusual experiences with curiosity, responsibility and care.",

    description:
      "Our paranormal investigation service focuses on documenting and examining unusual or unexplained experiences through a structured and responsible approach.",

    longDescription:
      "Experiences that appear unusual or unexplained can sometimes create fear, confusion or uncertainty. Our approach is focused on listening carefully, documenting reported experiences and examining possible explanations while maintaining sensitivity towards the individuals involved.",

    benefits: [
      "Structured examination of unusual experiences",
      "Careful documentation of reported incidents",
      "A calm and non-judgmental approach",
      "Consideration of possible explanations",
      "Individual-focused consultation",
      "Responsible handling of sensitive experiences",
    ],

    areas: [
      "Unusual experiences",
      "Reported paranormal activity",
      "Environmental observations",
      "Case documentation",
      "Individual consultation",
      "Paranormal research",
    ],

    quote:
      "Curiosity becomes meaningful when it is guided by observation, responsibility and understanding.",

    colorClass: "service-paranormal",
  },

  "psychological-assessment": {
    slug: "psychological-assessment",
    title: "Psychological Assessment",
    shortTitle: "Psychological Assessment",
    icon: FaBrain,

    tagline: "Structured assessment for deeper understanding.",

    description:
      "Psychological assessment involves structured methods that can help understand cognitive, emotional, behavioural and personality-related characteristics.",

    longDescription:
      "Psychological assessment can provide structured information about different aspects of an individual's psychological functioning. Depending on the purpose of assessment, appropriate psychological tools and methods may be considered to support a better understanding of the individual.",

    benefits: [
      "Structured psychological evaluation",
      "Better understanding of individual characteristics",
      "Identification of behavioural and emotional patterns",
      "Assessment-based insights",
      "Support for personal understanding",
      "Professionally guided assessment process",
    ],

    areas: [
      "Personality assessment",
      "Behavioural assessment",
      "Emotional assessment",
      "Cognitive assessment",
      "Individual assessment",
      "Psychological profiling",
    ],

    quote:
      "Understanding the mind begins with observing its patterns with patience and care.",

    colorClass: "service-psychology",
  },

  "moral-value-education": {
    slug: "moral-value-education",
    title: "Moral Value & Education",
    shortTitle: "Moral Value & Education",
    icon: FaHeart,

    tagline: "Building character through values, awareness and meaningful learning.",

    description:
      "Our moral value and education service focuses on developing ethical awareness, responsible thinking, positive behaviour and meaningful life values.",

    longDescription:
      "Education is not limited to academic knowledge. Values, character, responsibility, empathy and ethical thinking play an important role in personal and social development. Our approach encourages individuals to reflect on values and apply them meaningfully in everyday life.",

    benefits: [
      "Development of ethical awareness",
      "Character and personality development",
      "Responsible decision-making",
      "Empathy and compassion",
      "Positive social behaviour",
      "Value-based personal growth",
    ],

    areas: [
      "Value education",
      "Character development",
      "Ethical awareness",
      "Life skills",
      "Responsible citizenship",
      "Personal development",
    ],

    quote:
      "True education shapes not only what we know, but also who we become.",

    colorClass: "service-moral",
  },

  "spiritual-guidance": {
    slug: "spiritual-guidance",
    title: "Spiritual Guidance",
    shortTitle: "Spiritual Guidance",
    icon: FaPrayingHands,

    tagline: "A reflective journey towards inner awareness and balance.",

    description:
      "Spiritual guidance provides a supportive space for individuals seeking deeper self-reflection, inner awareness, meaning and spiritual growth.",

    longDescription:
      "Spirituality can be a deeply personal journey. Our spiritual guidance service creates space for reflection, exploration of personal beliefs and values, and a deeper connection with one's inner self.",

    benefits: [
      "Greater self-awareness",
      "Inner reflection and clarity",
      "Exploration of personal meaning",
      "Emotional and spiritual balance",
      "Mindful self-reflection",
      "Personal and spiritual growth",
    ],

    areas: [
      "Spiritual counselling",
      "Inner reflection",
      "Personal spirituality",
      "Mindfulness",
      "Life meaning",
      "Spiritual growth",
    ],

    quote:
      "The journey inward can reveal perspectives that transform the journey ahead.",

    colorClass: "service-spiritual",
  },
};

export default servicesData;