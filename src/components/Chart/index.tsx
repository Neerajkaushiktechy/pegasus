import { Typography, Grid, Box, Stack } from "@mui/material";
import weightIcon from "../../assets/weight.png"
import bloodPressureIcon from "../../assets/blood-pressure.png"
import heightIcon from "../../assets/height.png"
import bmiIcon from "../../assets/bmi.png"
import heartRateIcon from "../../assets/heartrate.png"
import iconBP from "../../assets/IC.svg"
import graphBlue from "../../assets/graph-blue.svg"
import iconHeart from "../../assets/icon-heart.svg"
import graphRed from "../../assets/graph-red.svg"
import iconBMI from "../../assets/icon-bmi.svg"
import graphDarkGreen from "../../assets/graph-dark-green.svg"
import iconHeight from "../../assets/icon-heart.svg"
import graphGreen from "../../assets/graph-green.svg"
import iconWeight from "../../assets/icon-weight.svg"
import graphPurple from "../../assets/graph-purple.svg"
import IconRespiratory from "../../assets/IconRespiratory.svg"
import graphRespiratory from "../../assets/graphRespiratory.svg"
type props = {
    chartData?: any
    type?: string
}

const CharComponent = ({ chartData, type = "" }: props) => {
    if (type === "graph") {
        return (
            <Grid container spacing={3} marginTop={"40px"}>
                <Grid item sx={{ width: "20%" }}>
                    <Box sx={{ background: "#E4F4FB", borderRadius: "10px" }} >
                        <Box sx={{ padding: "20px 20px 10px 20px" }}>
                            <img src={iconBP} alt="img" style={{ marginBottom: "10px" }} />
                            <Typography variant="body1" color="common.black" sx={{ marginBottom: "6px" }}>
                                Blood Pressure
                            </Typography>
                            <Typography variant="h2" color="common.black" sx={{ color: "#60dbff", fontSize: "24px", fontWeight: "500", height: "60px", overflow: "hidden" }}>
                                {chartData?.bloodPressure.mm}/{chartData?.bloodPressure.hg}
                                <Typography variant="body2" component="span" color="text.secondary"> mm/HG</Typography>
                            </Typography>
                        </Box>
                        <img src={graphBlue} alt="img" />
                    </Box>
                </Grid>
                <Grid item sx={{ width: "20%" }}>
                    <Box sx={{ background: "#FFF2EF", borderRadius: "10px" }} >
                        <Box sx={{ padding: "20px 20px 10px 20px" }}>
                            <img src={iconHeart} alt="img" style={{ marginBottom: "10px" }} />
                            <Typography variant="body1" color="common.black" sx={{ marginBottom: "6px" }}>
                                Heart Rate
                            </Typography>
                            <Typography variant="h2" color="common.black" sx={{ color: "#C53E4E", fontSize: "24px", fontWeight: "500", height: "60px", overflow: "hidden" }}>
                                {chartData?.heartRate}
                                <Typography variant="body2" component="span" color="text.secondary"> Beats/Minute</Typography>
                            </Typography>
                        </Box>
                        <img src={graphRed} alt="img" />
                    </Box>
                </Grid>
                <Grid item sx={{ width: "20%" }}>
                    <Box sx={{ background: "linear-gradient(180deg, rgba(0, 198, 169, 0) 0%, #FFFFFF 133.18%)", borderRadius: "10px" }} >
                        <Box sx={{ padding: "20px 20px 10px 20px" }}>
                            <img src={IconRespiratory} alt="img" style={{ marginBottom: "10px" }} />
                            <Typography variant="body1" color="common.black" sx={{ marginBottom: "6px" }}>
                                Respiratory Rate
                            </Typography>
                            <Typography variant="h2" color="common.black" sx={{ color: "#00C6A9;;", fontSize: "24px", fontWeight: "500", height: "60px", overflow: "hidden" }}>
                                {chartData?.respiratoryRate}
                                <Typography variant="body2" component="span" color="text.secondary"> Beats/Minute</Typography>
                            </Typography>
                        </Box>
                        <img src={graphRespiratory} alt="img" />
                    </Box>
                </Grid>
                <Grid item sx={{ width: "20%" }}>
                    <Box sx={{ background: "#E4FAFA", borderRadius: "10px" }} >
                        {/* <Box sx={{ padding: "20px" }}> */}
                        <Box sx={{ padding: "20px 20px 10px 20px", whiteSpace: "pre-line", overflow: "inherit", textOverflow: "ellipsis", wordWrap: "break-word", wordBreak: "break-all" }}>
                            <img src={iconBMI} alt="img" style={{ marginBottom: "10px" }} />
                            <Typography variant="body1" color="common.black" sx={{ marginBottom: "6px" }}>
                                BMI
                            </Typography>
                            <Typography variant="h2" color="common.black" sx={{ color: "#5A8181", fontSize: "24px", fontWeight: "500", height: "60px", overflow: "hidden" }}>
                                {chartData?.bmi}
                                <Typography variant="body2" component="span" color="text.secondary"> mm/HG</Typography>
                            </Typography>
                        </Box>
                        <img src={graphDarkGreen} alt="img" />
                    </Box>
                </Grid>
                <Grid item sx={{ width: "20%" }}>
                    <Box sx={{ background: "#E6FDEF", borderRadius: "10px" }} >
                        <Box sx={{ padding: "20px 20px 10px 20px" }}>
                            <img src={iconHeight} alt="img" style={{ marginBottom: "10px" }} />
                            <Typography variant="body1" color="common.black" sx={{ marginBottom: "6px" }}>
                                Height
                            </Typography>
                            <Typography variant="h2" color="common.black" sx={{ color: "#64E499", fontSize: "24px", fontWeight: "500", height: "60px", overflow: "hidden" }}>
                                {chartData?.height?.value}
                                <Typography variant="body2" component="span" color="text.secondary">{chartData?.height?.measureType}</Typography>
                            </Typography>
                        </Box>
                        <img src={graphGreen} alt="img" />
                    </Box>
                </Grid>
                <Grid item sx={{ width: "20%" }}>
                    <Box sx={{ background: "#FAEBFF", borderRadius: "10px" }} >
                        <Box sx={{ padding: "20px 20px 10px 20px" }}>
                            <img src={iconWeight} alt="img" style={{ marginBottom: "10px" }} />
                            <Typography variant="body1" color="common.black" sx={{ marginBottom: "6px" }}>
                                Weight
                            </Typography>
                            <Typography variant="h2" color="common.black" sx={{ color: "#8735A5", fontSize: "24px", fontWeight: "500", height: "60px", overflow: "hidden" }}>
                                {chartData?.weight.value}
                                <Typography variant="body2" component="span" color="text.secondary">{chartData?.weight.measureType}</Typography>

                            </Typography>
                        </Box>
                        <img src={graphPurple} alt="img" />
                    </Box>
                </Grid>
            </Grid>
        )
    }
    else {
        return (
            <Grid item md={12} xs={12}>
                <Stack direction={"row"} display={"flex"} justifyContent={"space-evenly"} spacing={3} alignItems={"baseline"} flexWrap={"wrap"}>
                    <Box sx={{ display: "flex", alignItems: "center", marginRight: "30px !important", marginBottom: "40px !important", marginLeft: "0 !important" }}>
                        <img src={bmiIcon} alt="bmi" style={{
                            maxWidth: "60px",
                            minWidth: "60px",
                            marginRight: "10px"
                        }} />
                        <Box>
                            <Typography sx={{ whiteSpace: "nowrap" }}>BMI</Typography>
                            <Typography>{Number(chartData?.bmi)?.toFixed(2)}</Typography>
                        </Box>
                    </Box>
                    <Box sx={{ display: "flex", alignItems: "center", marginRight: "30px !important", marginBottom: "40px !important", marginLeft: "0 !important" }}>
                        <img src={heightIcon} alt="height" style={{
                            maxWidth: "60px",
                            minWidth: "60px",
                            marginRight: "10px"
                        }} />
                        <Box>
                            <Typography sx={{ whiteSpace: "nowrap" }}>Height</Typography>
                            <Typography>{chartData?.height?.value} {chartData?.height?.measureType}</Typography>
                        </Box>
                    </Box>
                    <Box sx={{ display: "flex", alignItems: "center", marginRight: "30px !important", marginBottom: "40px !important", marginLeft: "0 !important" }}>
                        <img src={weightIcon} alt="weight" style={{
                            maxWidth: "60px",
                            minWidth: "60px",
                            marginRight: "10px"
                        }} />
                        <Box>
                            <Typography sx={{ whiteSpace: "nowrap" }}>Weight</Typography>
                            <Typography>{chartData?.weight.value} {chartData?.weight?.measureType}</Typography>
                        </Box>
                    </Box>
                    <Box sx={{ display: "flex", alignItems: "center", marginRight: "30px !important", marginBottom: "40px !important", marginLeft: "0 !important" }}>
                        <img src={bloodPressureIcon} alt="blood" style={{
                            maxWidth: "60px",
                            minWidth: "60px",
                            marginRight: "10px"
                        }} />
                        <Box>
                            <Typography sx={{ whiteSpace: "nowrap" }}>Blood Pressure</Typography>
                            {chartData?.bloodPressure.mm && <Typography>{chartData?.bloodPressure.mm}/{chartData?.bloodPressure.hg}</Typography>}
                        </Box>
                    </Box>
                    <Box sx={{ display: "flex", alignItems: "center", marginRight: "30px !important", marginBottom: "40px !important", marginLeft: "0 !important" }}>
                        <img src={IconRespiratory} alt="blood" style={{
                            maxWidth: "60px",
                            minWidth: "60px",
                            marginRight: "10px"
                        }} />
                        <Box>
                            <Typography sx={{ whiteSpace: "nowrap" }}> Respiratory Rate</Typography>
                            <Typography> {chartData?.respiratoryRate}</Typography>
                        </Box>
                    </Box>
                    <Box sx={{ display: "flex", alignItems: "center", marginRight: "30px !important", marginBottom: "40px !important", marginLeft: "0 !important" }}>
                        <img src={heartRateIcon} alt="heart" style={{
                            maxWidth: "60px",
                            minWidth: "60px",
                            marginRight: "10px"
                        }} />
                        <Box>
                            <Typography sx={{ whiteSpace: "nowrap" }}>Heart Rate</Typography>
                            <Typography>{chartData?.heartRate}</Typography>
                        </Box>
                    </Box>
                </Stack>
            </Grid>
        )
    }
}

export default CharComponent