exports.index = (req, res) => {
    const data = {
        title: "Diary Thing",
        description: "Best diary for cats and dogs!",
    };
    res.status(200).json(data);
};
