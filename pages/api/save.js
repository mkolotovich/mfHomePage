import dbConnect from '../../lib/dbConnect'
const { Phone } = require('../../models/Phone.cjs');

export default async (req, res) => {
  const { method } = req

  await dbConnect()

  switch (method) {
    case 'GET':
      try {
        const pets = await User.find({}) /* find all the data in our database */
        res.status(200).json({ success: true, data: pets })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break
    case 'POST':
      try {
        const {administration} = req.body;
        const updatedAdministration = await Phone.findByIdAndUpdate(req.body._id, {
          authority: administration.authority, 
          management: administration.management, 
          location: administration.location,
          email: administration.email,
          phone_code: administration.phone_code,
        }, {new: true});
        res.status(201).json({ success: true, data: updatedAdministration._doc })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break
    default:
      res.status(400).json({ success: false })
      break
  }
}
