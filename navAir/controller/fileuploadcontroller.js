const upload = require('../middleware/fileupload');
const db = require('../model/db');

exports.uploadTicket = (req, res) => {
  upload.single('file')(req, res, (err) => {
    if (err) {
      console.error('File upload error:', err);
      return res.status(400).json({
        success: false,
        message: `File upload error: ${err.message}`,
      });
    }

    if (!req.file) {
      console.warn('No file uploaded in request');
      return res.status(400).json({
        success: false,
        message: 'No file uploaded',
      });
    }

    const filePath = req.file.path;
    console.log('Raw file path:', filePath);

    const pdfLink = filePath.replace(/^uploads[\\/]/, '').replace(/\\/g, '/');
    console.log('Processed PDF Link:', pdfLink);

    const pnrId = req.query.id;

    if (!pnrId) {
      console.warn('Missing PNR ID in query');
      return res.status(400).json({
        success: false,
        message: 'Missing PNR ID in query parameters',
      });
    }

    const query = `
      UPDATE pnr_records
      SET
        ticket_url = ?,
        ticket_status = CASE
          WHEN ? IS NOT NULL THEN 'TICKETED'
          ELSE 'pending'
        END
      WHERE id = ?`;

    db.query(query, [pdfLink, pdfLink, pnrId], (error, results) => {
      if (error) {
        console.error('Database error:', error);
        return res.status(500).json({
          success: false,
          message: 'Database error occurred while saving the PDF link',
          error: error.message,
        });
      }

      console.log('Database update result:', results);

      res.status(200).json({
        success: true,
        message: 'File uploaded and PDF link saved successfully, ticket status updated',
        data: {
          fileName: req.file.filename,
          filePath: filePath,
          pdfLink: pdfLink,
          ticketStatus: results.changedRows > 0 ? 'TICKETED' : 'pending',
        },
      });
    });
  });
};

