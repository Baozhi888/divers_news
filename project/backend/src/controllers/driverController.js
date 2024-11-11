import db from '../config/database.js';

export const getDrivers = async (req, res) => {
  try {
    const result = await db.execute('SELECT * FROM drivers');
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching drivers' });
  }
};

export const createDriver = async (req, res) => {
  try {
    const { licensePlate, name, wechatId, wechatName, phone, parkingLocation, 
            appUsername, appPassword, invoiceDate, amount, notes } = req.body;
            
    await db.execute({
      sql: `INSERT INTO drivers (licensePlate, name, wechatId, wechatName, phone,
            parkingLocation, appUsername, appPassword, invoiceDate, amount, notes)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      args: [licensePlate, name, wechatId, wechatName, phone, parkingLocation,
             appUsername, appPassword, invoiceDate, amount, notes]
    });
    
    res.status(201).json({ message: 'Driver created successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error creating driver' });
  }
};

export const updateDriver = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    
    await db.execute({
      sql: `UPDATE drivers SET 
            licensePlate = ?, name = ?, wechatId = ?, wechatName = ?, phone = ?,
            parkingLocation = ?, appUsername = ?, appPassword = ?, invoiceDate = ?,
            amount = ?, notes = ? WHERE id = ?`,
      args: [...Object.values(updates), id]
    });
    
    res.json({ message: 'Driver updated successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error updating driver' });
  }
};

export const deleteDriver = async (req, res) => {
  try {
    const { id } = req.params;
    await db.execute({
      sql: 'DELETE FROM drivers WHERE id = ?',
      args: [id]
    });
    res.json({ message: 'Driver deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting driver' });
  }
};

export const batchDeleteDrivers = async (req, res) => {
  try {
    const { ids } = req.body;
    await db.execute({
      sql: 'DELETE FROM drivers WHERE id IN (?)',
      args: [ids.join(',')]
    });
    res.json({ message: 'Drivers deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting drivers' });
  }
};
