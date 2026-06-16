exports.uploadFile = (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: 'Please upload a file' });
    }
    const fileUrl = `/uploads/${req.file.filename}`;
    res.json({ receipt_url: fileUrl });
};
