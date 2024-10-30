app.get("/students", async (req, res) => {
	const students = await Student.findAll();
	res.render("students", { students });
});
