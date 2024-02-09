
import { Input, FormControl, InputLabel, Grid, Box, Button, Typography, Stack, Paper, TextField } from "@mui/material";
import { useState } from 'react'
import CloseIcon from "@mui/icons-material/Close";
type props = {
    masterDataFormData: any;
    setshow: (value: boolean) => void;
    handleSubmit: (value: string) => void;
    setmasterDataFormData: any;
}

const AddMasterData = ({ setshow, handleSubmit, masterDataFormData, setmasterDataFormData }: props) => {
    const [MetaData, setMetaData] = useState<string>('')
    return (
        <Paper>
            <Stack p={2} direction="row" justifyContent="space-between" alignItems="center" spacing={2} bgcolor="primary.light">
                <Typography fontWeight="600">{masterDataFormData?.header}</Typography>
                <Button
                    onClick={() => {
                        setshow(false);
                    }}
                >
                    <CloseIcon />
                </Button>
            </Stack>
            <Box
                component="form"
                sx={{ padding: "30px !important" }}
                onSubmit={(e) => {
                    e.preventDefault();
                    handleSubmit(MetaData);
                }}
            >
                <Grid container spacing={2} p={2}>
                    <Grid item md={12} xs={12}>
                        <Grid item xs={12}>
                            <FormControl variant="standard" fullWidth>
                                <InputLabel shrink htmlFor={masterDataFormData?.name} required>
                                    {/* {
                                        masterDataFormData?.name === "medicine"
                                            ? "MEDICATION"
                                            : masterDataFormData?.name === "domainClass"
                                                ? "DOMAIN CLASS"
                                                : masterDataFormData?.name
                                                    ? masterDataFormData.name.toUpperCase()
                                                    : undefined
                                    } */}
                                    {
                                        (masterDataFormData?.name === "medicine")
                                            ? "MEDICATION"
                                            : (masterDataFormData?.name === "medication")
                                                ? "MEDICINE"
                                                : (masterDataFormData?.name === "domainClass")
                                                    ? "DOMAIN CLASS"
                                                    : (masterDataFormData?.name)
                                                        ? masterDataFormData.name.toUpperCase()
                                                        : undefined
                                    }
                                </InputLabel>
                                <Input
                                    id={masterDataFormData?.name}
                                    required
                                    name={masterDataFormData?.name}
                                    onChange={(e) => setMetaData(e.target.value)}
                                    type="text"
                                    fullWidth
                                    disableUnderline
                                />
                            </FormControl>
                        </Grid>
                    </Grid>
                    {
                        masterDataFormData?.name === "medicine" &&
                        <Grid item md={12} xs={12}>
                            <Grid item xs={12}>
                                <InputLabel shrink htmlFor="description" required>
                                    DESCRIPTION
                                </InputLabel>
                                <FormControl variant="standard" fullWidth>
                                    <TextField
                                        id="description"
                                        required
                                        name="description"
                                        onChange={(e) => setmasterDataFormData((prev: any) => ({ ...prev, description: e.target.value }))}
                                        type="text"
                                        fullWidth
                                        multiline
                                        maxRows={4}
                                    // disableUnderline
                                    />
                                </FormControl>
                            </Grid>
                            <Grid item xs={12}>
                                <InputLabel shrink htmlFor="uses" required sx={{ paddingTop: "15px" }}>
                                    USES
                                </InputLabel>
                                <FormControl variant="standard" fullWidth>
                                    <TextField
                                        id="uses"
                                        required
                                        name="uses"
                                        onChange={(e) => setmasterDataFormData((prev: any) => ({ ...prev, uses: e.target.value }))}
                                        type="text"
                                        fullWidth
                                        multiline
                                        maxRows={2}
                                    // disableUnderline
                                    />
                                </FormControl>
                            </Grid>
                            <Grid item xs={12}>
                                <InputLabel shrink htmlFor="list" required sx={{ paddingTop: "15px" }}>
                                    MEDICINES NAME
                                </InputLabel>
                                <FormControl variant="standard" fullWidth>
                                    <TextField
                                        id="list"
                                        required
                                        name="list"
                                        onChange={(e) => setmasterDataFormData((prev: any) => ({ ...prev, list: e.target.value }))}
                                        type="text"
                                        fullWidth
                                        multiline
                                        maxRows={4}
                                    // disableUnderline
                                    />
                                </FormControl>
                            </Grid>
                        </Grid>


                    }

                    {
                        masterDataFormData?.name === "domainClass" &&
                        <Grid item md={12} xs={12}>
                            <Grid item xs={12}>
                                <InputLabel shrink htmlFor="list" required sx={{ paddingTop: "15px" }}>
                                    DAIGNOSIS  LIST
                                </InputLabel>
                                <FormControl variant="standard" fullWidth>
                                    <TextField
                                        id="list"
                                        required
                                        name="list"
                                        onChange={(e) => setmasterDataFormData((prev: any) => ({ ...prev, list: e.target.value }))}
                                        type="text"
                                        fullWidth
                                        multiline
                                        maxRows={4}
                                    // disableUnderline
                                    />
                                </FormControl>
                            </Grid>
                        </Grid>


                    }

                </Grid>
                <Box mt="50px" textAlign="right">
                    <Button
                        variant="outlined"
                        color="secondary"
                        sx={{ mr: "20px" }}
                        onClick={() => setshow(false)}
                    >
                        Cancel
                    </Button>
                    <Button variant="contained" color="secondary" type="submit">
                        Save
                    </Button>
                </Box>
            </Box>
        </Paper>
    )

}

export default AddMasterData