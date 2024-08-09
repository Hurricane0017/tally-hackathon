
const submitCode = async (req, res) => {
    const { code, language, problemId, userId } = req.body;
    try {
        // Save the code to the database
        const submission = await Submission.create({
        code,
        language,
        problemId,
        userId,
        });
    
        res.status(200).json({ status: "success", submission });
    } catch (error) {
        res.status(500).json({ status: "error", message: error.message });
    }
};

module.exports = submitCode;
