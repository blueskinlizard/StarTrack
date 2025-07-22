const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const csv = require('csv-parser');


router.post('/findStar', async(req, res)=>{
  const { searchedStar }= req.body;
  const [plate, mjd, fiberid] = searchedStar.split('-');
  const results = [];
  // If you wish to download this file for personal use, please email me. 
  // I will not be uploading this to GitHub due to large file storage concerns.
  const csvPath = path.join(__dirname, './server_data/final_predictions.csv');
  let found = false;
  try {
    fs.createReadStream(csvPath)
      .pipe(csv())
      .on('data', (row) => {
        if (
          row.PLATE === plate &&
          row.MJD === mjd &&
          row.FIBERID === fiberid
        ) {
          found = true;
          results.push(row);
        }
      })
      .on('end', () => {
        if (found) {
          res.json({ result: results[0] });
        } else {
          res.status(404).json({ error: 'Star not found in csv' });
        }
      });
  } catch (error) {
    console.error('Error reading CSV:', error);
    res.status(500).json({ error: 'Server error while reading star data' });
  }
})

module.exports = router;