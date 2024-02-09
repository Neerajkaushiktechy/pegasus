
import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import { CardContent, Card, Box, Typography, Grid, Container } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export default function Faq() {
    return (
        <Box py={{ xs: "120px", md: "140px", lg: "180px" }} sx={{ background: "#FCF6FF", position: "relative" }}>
            <Container>
                <Typography sx={{ fontWeight: "500", fontSize: "24px", color: "black", marginBottom: "16px", textAlign: "center" }}>Frequently Asked Questions</Typography>
                <Typography sx={{ fontWeight: "400", fontSize: "18px", color: "black", marginBottom: "40px", textAlign: "center" }}>You have questions? We have answers! The following are frequently asked questions about Pegasus Learning Platform. If you don’t find what you are looking for here, our representatives are happy to help!</Typography>
                <Accordion>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                        <Typography sx={{ fontWeight: "500", color: "rgb(68 14 102)" }}>Is Pegasus Learning Platform Available To Individuals Who Want A Little More Knowledge Or Practice?</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography sx={{ textAlign: "justify" }}>
                            Yes! Individuals can sign up to access Pegasus Learning Platform; although we offer solutions for schools, you do not need to be enrolled with an institution to use Pegasus. Case studies, scenarios, products, and practice questions are available on Pegasus to help the individual gain competency using Health Information Technology.
                        </Typography>
                    </AccordionDetails>
                </Accordion>
                <Accordion>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                        <Typography sx={{ fontWeight: "500", color: "rgb(68 14 102)" }}>How Can Pegasus Help Me, As A Student?</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography sx={{ textAlign: "justify" }}>
                            Pegasus offers options for Electronic Health Record navigation and practice, clinical scenarios, case studies, quizzes, and products to help build critical thinking and clinical judgement skills.
                        </Typography>
                    </AccordionDetails>
                </Accordion>
                <Accordion>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel2a-content"
                        id="panel2a-header"
                    >
                        <Typography sx={{ fontWeight: "500", color: "rgb(68 14 102)" }}>Can I Choose The Options And Products I Want?</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography sx={{ textAlign: "justify" }}>
                            Yes; you can! Pegasus offers Electronic Health Record navigation as well as case studies, scenarios, study material, and products. Individuals can choose products to focus on their specific learning needs.
                        </Typography>
                    </AccordionDetails>
                </Accordion>
                <Accordion>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel2a-content"
                        id="panel2a-header"
                    >
                        <Typography sx={{ fontWeight: "500", color: "rgb(68 14 102)" }}>Can I Choose The Options And Products I Want?</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography sx={{ textAlign: "justify" }}>
                            Yes; you can! Pegasus offers Electronic Health Record navigation as well as case studies, scenarios, study material, and products. Individuals can choose products to focus on their specific learning needs.
                        </Typography>
                    </AccordionDetails>
                </Accordion>
                <Accordion>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel2a-content"
                        id="panel2a-header"
                    >
                        <Typography sx={{ fontWeight: "500", color: "rgb(68 14 102)" }}>Can Schools Use Pegasus To Integrate Learning Solutions Into Curricula?</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography sx={{ textAlign: "justify" }}>
                            Yes! Pegasus Learning Platforms has options for institutions to enroll students in courses, access ready-made options or add their own assignments. We also meet required objectives for clinical simulation and Electronic Health Record education for healthcare providers.
                        </Typography>
                    </AccordionDetails>
                </Accordion>
                <Accordion>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel2a-content"
                        id="panel2a-header"
                    >
                        <Typography sx={{ fontWeight: "500", color: "rgb(68 14 102)" }}>Can Instructors Use Pegasus To Manage The Hands-On Clinical Experience?</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography sx={{ textAlign: "justify" }}>
                            Absolutely! Instructors can use Pegasus with the hands-on clinical experience for charting and navigating a simulated Electronic Health Record (EHR) for their students’ patients, develop care plans, design quizzes and tests, and use the platform for managing grades.
                        </Typography>
                        <Typography sx={{ textAlign: "justify" }}>
                            Some clinical sites provide limited (if any) student access to EHRs, and some do not allow students to input any information into the record. Pegasus solves this problem by allowing instructors to use the platform as the EHR for the hands-on clinical experience. Pegasus can also be integrated into the simulated clinical aspect by providing Health Information Technology for the simulation lab experience.
                        </Typography>
                        <Typography sx={{ textAlign: "justify" }}>
                            Instructors can use ready-to-access products and assignments or add their own. This capability allows instructors to tailor the student access to suit the program learning objectives.
                        </Typography>
                    </AccordionDetails>
                </Accordion>
                <Accordion>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel2a-content"
                        id="panel2a-header"
                    >
                        <Typography sx={{ fontWeight: "500", color: "rgb(68 14 102)" }}>Can Pegasus Be Used Alone For Simulations?</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography sx={{ textAlign: "justify" }}>
                            Yep! Case studies and scenarios are available or can be customized by the instructor. Pegasus can be integrated with the hands-on clinical experience or can be used to manage clinical simulations.
                        </Typography>
                    </AccordionDetails>
                </Accordion>
                <Accordion>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel2a-content"
                        id="panel2a-header"
                    >
                        <Typography sx={{ fontWeight: "500", color: "rgb(68 14 102)" }}>Is Pegasus Only For Clinical Or Simulations?</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography sx={{ textAlign: "justify" }}>
                            Nope! Although Pegasus works beautifully for clinical and simulation experiences, instructors have the capability to group assignments, make quizzes, provide resources for students, as well as input grades for off-line work. This capability means that Pegasus can be used as an electronic platform to manage coursework.
                        </Typography>
                    </AccordionDetails>
                </Accordion>
                <Accordion>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel2a-content"
                        id="panel2a-header"
                    >
                        <Typography sx={{ fontWeight: "500", color: "rgb(68 14 102)" }}>Can Pegasus Be Used For Different Disciplines?</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography sx={{ textAlign: "justify" }}>
                            Sure! The flexibility and design options to add resources, develop scenarios, integrate case studies, input quizzes, and manage grades makes Pegasus an excellent solution for many disciplines, from nursing, medical building and coding, respiratory therapy, pharmacy technicians, and, well…pretty much whatever you can imagine! If the discipline requires a health record, Pegasus can work for it!
                        </Typography>
                    </AccordionDetails>
                </Accordion>
            </Container>
        </Box >
    );
}