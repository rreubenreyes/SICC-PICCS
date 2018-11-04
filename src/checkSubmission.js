const checkSubmission = (goal, submissionResults, thresholdPercent) => {
    const names = [];
    submissionResults.outputs[0].data.concepts
        .filter(item => item.value > thresholdPercent)
        .map(item => names.push(item.name));
    return names.includes(goal);
};

export default checkSubmission;
