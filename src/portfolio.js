/* Change this file to get your personal Portfolio */

// To change portfolio colors globally go to the  _globalColor.scss file

import emoji from "react-easy-emoji";
import splashAnimation from "./assets/lottie/splashAnimation"; // Rename to your file name for custom animation

// Splash Screen

const splashScreen = {
  enabled: true, // set false to disable splash screen
  animation: splashAnimation,
  duration: 2000 // Set animation duration as per your animation
};

// Summary And Greeting Section

const illustration = {
  animated: true // Set to false to use static SVG
};

const greeting = {
  username: "MuZakkir Saifi",
  title: "Hey !! I'm MuZakkir",
  // subTitle: emoji(
  //   "a passionate DevOps Engineer dedicated to streamlining processes and fostering collaboration between development and operations teams. With expertise in infrastructure as code, automation, and cloud technologies, I thrive in dynamic environments where innovation and efficiency are paramount. From small startups to large enterprises, I've led transformative initiatives to accelerate software delivery and enhance reliability. Let's embrace the principles of DevOps together and pave the way for a brighter future in technology."
  // ),
  subTitle: emoji(
    "DevOps enthusiast committed to streamlining workflows and fostering collaboration for efficient software delivery. With expertise in automation and cloud technologies, I drive continuous integration and deployment, revolutionizing development practices.!"
  ),
  resumeLink:
    "https://drive.google.com/file/d/1ofFdKF_mqscH8WvXkSObnVvC9kK7Ldlu/view?usp=sharing", // Set to empty to hide the button
  displayGreeting: true // Set false to hide this section, defaults to true
};

// Social Media Links

const socialMediaLinks = {
  github: "https://github.com/muzakkirsaifi123",
  linkedin: "https://www.linkedin.com/in/mohd-muzakkir-s-b89755175/",
  gmail: "muzakkirsaifi8@gmail.com",
  // gitlab: "https://gitlab.com/saadpasta",
  // facebook: "https://www.facebook.com/saad.pasta7",
  // medium: "https://medium.com/@saadpasta",
  // stackoverflow: "https://stackoverflow.com/users/10422806/saad-pasta",
  // Instagram, Twitter and Kaggle are also supported in the links!
  // To customize icons and social links, tweak src/components/SocialMedia
  display: true // Set true to display this section, defaults to false
};

// Skills Section

const skillsSection = {
  title: "What I do",
  subTitle: "CRAZY DEVOPS ENTHUSIAST! Who wants to explore every tech stack...",
  skills: [
    emoji("⚡ Can automate the complete infras using terraform."),
    emoji("⚡ Worked on the diffrent clouds like AWS, AZURE and GCP."),
    emoji(
      "⚡ Can write the CI/CD pipeline with the different tools like Jenkins, GitHub Action, Azure DevOps, Concourse and many more."
    ),
    emoji(
      "⚡ Can worked with the various devops tools like - Ansible, Docker, Helm, Chef, Prometheus, Grafana, Kubernetes and many more.."
    )
  ],

  /* Uses Devicons v2.16 (https://devicon.dev) and Font Awesome 5 classnames.
     Devicon pattern:  devicon-{name}-{variant} [colored]
     FA5 pattern:      fab fa-{name} / fas fa-{name}                        */

  softwareSkills: [
    {
      skillName: "AWS",
      fontAwesomeClassname: "devicon-amazonwebservices-plain-wordmark colored"
    },
    {
      skillName: "Azure",
      fontAwesomeClassname: "devicon-azure-plain colored"
    },
    {
      skillName: "GCP",
      fontAwesomeClassname: "devicon-googlecloud-original colored"
    },
    {
      skillName: "Docker",
      fontAwesomeClassname: "devicon-docker-plain colored"
    },
    {
      skillName: "Kubernetes",
      fontAwesomeClassname: "devicon-kubernetes-plain colored"
    },
    {
      skillName: "Terraform",
      fontAwesomeClassname: "devicon-terraform-original colored"
    },
    {
      skillName: "Ansible",
      fontAwesomeClassname: "devicon-ansible-original colored"
    },
    {
      skillName: "Python",
      fontAwesomeClassname: "devicon-python-original colored"
    },
    {
      skillName: "Bash",
      fontAwesomeClassname: "devicon-bash-plain"
    },
    {
      skillName: "GitHub",
      fontAwesomeClassname: "devicon-github-original"
    },
    {
      skillName: "GitHub Actions",
      fontAwesomeClassname: "devicon-github-original colored"
    },
    {
      skillName: "GitLab CI",
      fontAwesomeClassname: "devicon-gitlab-original colored"
    },
    {
      skillName: "Jenkins",
      fontAwesomeClassname: "devicon-jenkins-original colored"
    },
    {
      skillName: "Helm",
      fontAwesomeClassname: "devicon-helm-original colored"
    },
    {
      skillName: "ArgoCD",
      fontAwesomeClassname: "devicon-argocd-original colored"
    },
    {
      skillName: "Prometheus",
      fontAwesomeClassname: "devicon-prometheus-original colored"
    },
    {
      skillName: "Grafana",
      fontAwesomeClassname: "devicon-grafana-original colored"
    },
    {
      skillName: "Linux",
      fontAwesomeClassname: "devicon-linux-plain"
    },
    {
      skillName: "Ubuntu",
      fontAwesomeClassname: "devicon-ubuntu-plain colored"
    },
    {
      skillName: "Git",
      fontAwesomeClassname: "devicon-git-plain colored"
    },
    {
      skillName: "Pulumi",
      imageUrl: "https://www.pulumi.com/logos/brand/avatar-on-white.svg"
    },
    {
      skillName: "Concourse CI",
      fontAwesomeClassname: "fas fa-infinity"
    },
    {
      skillName: "Terraform CDK",
      fontAwesomeClassname: "devicon-terraform-original colored"
    }
  ],
  display: true // Set false to hide this section, defaults to true
};

// Education Section

const educationInfo = {
  display: true, // Set false to hide this section, defaults to true
  schools: [
    {
      schoolName: "Dr. A.P.J Abdul Kalam University, Lucknow",
      logo: require("./assets/images/logo.png"),
      subHeader: "Bachelor of technology in Computer Science",
      duration: "August 2017 - May 2021",
      desc: "In my final year project, I developed an IoT solution for smart irrigation. By monitoring soil moisture levels in real-time, the system optimizes watering, conserving water and promoting sustainable agriculture. This innovative approach reduces water waste while ensuring healthy plant growth.",
      descBullets: [
        "My final project was recognized among the top three projects in our college.",
        "I received an award for achieving a high percentage in my course, maintaining exceptional attendance (98%), and was presented with a certificate and a 5000 rupee check."
      ]
    }
  ]
};

// Your top 3 proficient stacks/tech experience

const techStack = {
  viewSkillBars: true, //Set it to true to show Proficiency Section
  experience: [
    {
      Stack: "Infrastructure Automation", //Insert stack or technology you have experience in
      progressPercentage: "90%" //Insert relative proficiency in percentage
    },
    {
      Stack: "CI/CD",
      progressPercentage: "90%"
    },
    // {
    //   Stack: "Kubernetes",
    //   progressPercentage: "60%"
    // },
    // {
    //   Stack: "Ansible",
    //   progressPercentage: "60%"
    // },
    // {
    //   Stack: "Chef",
    //   progressPercentage: "60%"
    // },
    // {
    //   Stack: "Linux",
    //   // progressPercentage: "60%"
    // },
    // {
    //   Stack: "Python",
    //   progressPercentage: "60%"
    // },
    {
      Stack: "Azure",
      progressPercentage: "80%"
    },
    {
      Stack: "AWS",
      progressPercentage: "70%"
    }
  ],
  displayCodersrank: false // Set true to display codersrank badges section need to changes your username in src/containers/skillProgress/skillProgress.js:17:62, defaults to false
};

// Work experience section

const workExperiences = {
  display: true, //Set it to true to show workExperiences Section
  experience: [
    // {
    //   role: "Software Engineer",
    //   company: "Facebook",
    //   companylogo: require("./assets/images/facebookLogo.png"),
    //   date: "June 2018 – Present",
    //   desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    //   descBullets: [
    //     "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
    //     "Lorem ipsum dolor sit amet, consectetur adipiscing elit"
    //   ]
    // },
    // {
    //   role: "Front-End Developer",
    //   company: "Quora",
    //   companylogo: require("./assets/images/quoraLogo.png"),
    //   date: "May 2017 – May 2018",
    //   desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
    // },
    {
      role: "DevOps Engineer intern",
      company: "Knoldus",
      companylogo: require("./assets/images/knol.png"),
      date: "July 2021 – Jan 2022",
      desc: "I have joined this company as a DevOps Intern. As a DevOps, I had the opportunity to gain hands-on experience with a wide range of tools and cloud technologies. My responsibilities encompassed contributing to multiple projects and collaborating with teams to refine development and deployment processes."
    },
    {
      role: "DevOps Engineer",
      company: "Nashtech",
      companylogo: require("./assets/images/nash.png"),
      date: "Jan 2021 – Jan 2022",
      desc: "As a DevOps engineer at Nashtech, I spearheaded efforts to streamline development, collaborating with cross-functional teams to automate deployment processes and optimize workflows. My efforts yielded tangible improvements in productivity. I prioritized continuous learning, keeping our team aligned with industry best practices."
    },
    {
      role: "Senior DevOps Engineer",
      company: "Nashtech",
      companylogo: require("./assets/images/nash.png"),
      date: "Jan 2022 – Present",
      desc: "As a Senior DevOps Engineer at Nashtech, I have spearheaded numerous projects aimed at enhancing project capabilities and introducing innovative features. I managed project development and supervised DevOps interns, ensuring seamless operations. Currently, I'm focused on a cutting-edge project utilizing Helm, Kubernetes, Python, Azure DevOps, Terraform, and other tools to deploy a new application efficiently."
    }
  ]
};

/* Your Open Source Section to View Your Github Pinned Projects
To know how to get github key look at readme.md */

const openSource = {
  showGithubProfile: "true", // Set true or false to show Contact profile using Github, defaults to true
  display: true // Set false to hide this section, defaults to true
};

// Some big projects you have worked on

const bigProjects = {
  title: "Big Project",
  subtitle: "SOME COMPANIES WHERE I HAVE WORKED TO CREATE THEIR TECH",

  projects: [
    {
      image: require("./assets/images/DCT.webp"),
      projectName: "EMS-Duck Creek ",
      projectDesc:
        "As a DevOps engineer, I employ Terraform to automate infrastructure provisioning and create Terratest test cases for validation. Additionally, I orchestrate complete application deployment through Terraform, Azure DevOps, and custom scripts to ensure seamless automation.",
      footerLink: [
        // {
        //   name: "Visit Website",
        //   url: "http://saayahealth.com/"
        // }
        //  you can add extra buttons here.
      ]
    },
    {
      image: require("./assets/images/3TL.png"),
      projectName: "3-tier logic",
      projectDesc:
        "As the DevOps at 3-tier logic, I manage cloud infrastructure, implement Kubernetes deployments with Helm, and apply IaC principles using Terraform. Additionally, I optimize Nginx settings, automate tasks with Python, and utilize Azure services for microservices deployment. "
      // footerLink: [
      //   {
      //     name: "Visit Website",
      //     url: "http://nextu.se/"
      //   }
      // ]
    }
  ],
  display: true // Set false to hide this section, defaults to true
};

// Achievement Section
// Include certificates, talks etc

const achievementSection = {
  title: emoji("Achievements And Certifications 🏆 "),
  subtitle:
    "Achievements, Certifications, Award Letters and Some Cool Stuff that I have done !",

  achievementsCards: [
    {
      title: "Google Associate Certificate",
      subtitle:
        "My first certificate towords the cloud- Google Associate certification",
      image: require("./assets/images/GCP_associate_certficate.png"),
      imageAlt: "Google Code-In Logo",
      footerLink: [
        {
          name: "Certification",
          url: "https://www.credential.net/f369f9dd-f59a-40f2-8caa-8694d93630af#gs.6kblel"
        }
        // {
        //   name: "Award Letter",
        //   url: "https://drive.google.com/file/d/0B7kazrtMwm5dekxBTW5hQkg2WXUyR3QzQmR0VERiLXlGRVdF/view?usp=sharing"
        // },
        // {
        //   name: "Google Code-in Blog",
        //   url: "https://opensource.googleblog.com/2019/01/google-code-in-2018-winners.html"
        // }
      ]
    },
    {
      title: "Microsoft Certified: DevOps Engineer Expert",
      subtitle: "Microsoft Certified: DevOps Engineer Expert",
      image: require("./assets/images/badge-devops-expert.webp"),
      imageAlt: "Google Assistant Action Logo",
      footerLink: [
        {
          name: "Certification",
          url: "https://learn.microsoft.com/api/credentials/share/en-us/MohdMuzakkirSaifi-2544/DB01AAA6EA1B3A00?sharingId=4755FCAB157CB4FB"
        }
      ]
    },
    {
      title: "Microsoft Certified: Azure Database Administrator Associate",
      subtitle: "Microsoft Certified: Azure Database Administrator Associate",
      image: require("./assets/images/microsoft-certified-associate.webp"),
      imageAlt: "Microsoft Certified: Azure Database Administrator Associate",
      footerLink: [
        {
          name: "Certification",
          url: "https://learn.microsoft.com/api/credentials/share/en-us/MohdMuzakkirSaifi-2544/FA2F834F64B0CAF5?sharingId=4755FCAB157CB4FB"
        }
      ]
    },

    {
      title: "Microsoft Certified: Azure Fundamentals",
      subtitle: "Microsoft Certified: Azure Fundamentals",
      image: require("./assets/images/azure_fun.webp"),
      imageAlt: "Microsoft Certified: Azure Fundamentals",
      footerLink: [
        {
          name: "Certification",
          url: "https://learn.microsoft.com/api/credentials/share/en-us/MohdMuzakkirSaifi-2544/BBB0B1C599C43D3C?sharingId=4755FCAB157CB4FB"
        }
        // {
        //   name: "Final Project",
        //   url: "https://pakistan-olx-1.firebaseapp.com/"
        // }
      ]
    },
    {
      title:
        "Microsoft Certified: Security, Compliance, and Identity Fundamentals",
      subtitle:
        "Microsoft Certified: Security, Compliance, and Identity Fundamentals",
      image: require("./assets/images/azure_fun.webp"),
      imageAlt:
        "Microsoft Certified: Security, Compliance, and Identity Fundamentals",
      footerLink: [
        {
          name: "Certification",
          url: "https://learn.microsoft.com/api/credentials/share/en-us/MohdMuzakkirSaifi-2544/87EA72ADDAB79C7F?sharingId=4755FCAB157CB4FB"
        }
      ]
    }
  ],
  display: true // Set false to hide this section, defaults to true
};

// Blogs Section

const blogSection = {
  title: "Blogs",
  subtitle:
    "With Love for Developing cool stuff, I love to write and teach others what I have learnt.",
  displayMediumBlogs: "true", // Set true to display fetched medium blogs instead of hardcoded ones
  blogs: [
    // {
    //   url: "https://blog.knoldus.com/how-to-perform-different-operations-on-aws-s3-bucket-using-boto3/",
    //   title:
    //     "How to perform different operations on  AWS S3 bucket using Boto3",
    //   description:
    //     "We need to know about boto. What is boto??  Boto3 is the Amazon Web Services (AWS) Software Development Kit (SDK) for Python"
    // },
    {
      url: "https://blog.knoldus.com/author/muzakkirsaifi/",
      title: "DevOps Blogs",
      description: "You can find all the blogs here for devops"
      // subTitle: "testing"
    },
    {
      url: "https://blog.nashtechglobal.com/?s=saifi/",
      title: "Secondary DevOps Blogs site",
      description: "You can find all the blogs here for devops"
      // subTitle: "testing"
    }
  ],
  display: true // Set false to hide this section, defaults to true
};

// Talks Sections

const talkSection = {
  title: "TALKS",
  subtitle: emoji(
    "I LOVE TO SHARE MY LIMITED KNOWLEDGE AND GET A SPEAKER BADGE 😅"
  ),

  talks: [
    {
      title: "Build Actions For Google Assistant",
      subtitle: "Codelab at GDG DevFest Karachi 2019",
      slides_url: "https://bit.ly/saadpasta-slides",
      event_url: "https://www.facebook.com/events/2339906106275053/"
    }
  ],
  display: false // Set false to hide this section, defaults to true
};

// Podcast Section

const podcastSection = {
  title: emoji("Podcast 🎙️"),
  subtitle: "I LOVE TO TALK ABOUT MYSELF AND TECHNOLOGY",

  // Please Provide with Your Podcast embeded Link
  podcast: [
    "https://anchor.fm/codevcast/embed/episodes/DevStory---Saad-Pasta-from-Karachi--Pakistan-e9givv/a-a15itvo"
  ],
  display: false // Set false to hide this section, defaults to true
};

const contactInfo = {
  title: emoji("Contact Me ☎️"),
  subtitle:
    "Discuss a project or just want to say hi? My Inbox is open for all.",
  // number: "+91-9104234211",
  email_address: "muzakkirsaifi@gmail.com"
};

// Twitter Section

const twitterDetails = {
  userName: "twitter", //Replace "twitter" with your twitter username without @
  display: false // Set true to display this section, defaults to false
};

const isHireable = false; // Set false if you are not looking for a job. Also isHireable will be display as Open for opportunities: Yes/No in the GitHub footer

export {
  illustration,
  greeting,
  socialMediaLinks,
  splashScreen,
  skillsSection,
  educationInfo,
  techStack,
  workExperiences,
  openSource,
  bigProjects,
  achievementSection,
  blogSection,
  talkSection,
  podcastSection,
  contactInfo,
  twitterDetails,
  isHireable
};

// ─── End of portfolio.js ────────────────────────────────────────────────────
