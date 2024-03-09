const handler = async (req, res) => {
  const { character } = await req.json();
  res.setHeader("Content-Type", "application/json");
  res.setHeader("Content-Disposition", `attachment; filename=${character.name}.json`);
  res.status(200).send(JSON.stringify(character, null, 2));
};

export default handler;