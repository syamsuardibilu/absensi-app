import { pool } from '../../../../db';

export async function POST(request: Request) {
  try {
    const data = await request.json();

    if (!Array.isArray(data)) {
      return new Response(JSON.stringify({ success: false, error: 'Data harus berupa array' }), { status: 400 });
    }

    // Optional: Validasi data di server
    for (const item of data) {
      if (!item.perner || !/^\d+$/.test(item.perner)) {
        return new Response(JSON.stringify({ success: false, error: 'Perner harus berupa angka' }), { status: 400 });
      }
      if (!item.tanggal || !/^\d{4}-\d{2}-\d{2}$/.test(item.tanggal)) {
        return new Response(JSON.stringify({ success: false, error: 'Tanggal harus dalam format yyyy-mm-dd' }), { status: 400 });
      }
    }

    // Update database: insert or update
    // Contoh query insert, sesuaikan dengan struktur tabel Anda
    const client = await pool.connect();
    try {
      await client.query('BEGIN');
      for (const item of data) {
        await client.query(
          `INSERT INTO your_table_name (perner, tanggal) VALUES ($1, $2)
           ON CONFLICT (perner, tanggal) DO UPDATE SET perner = EXCLUDED.perner`,
          [item.perner, item.tanggal]
        );
      }
      await client.query('COMMIT');
    } catch (err) {
      await client.query('ROLLBACK');
      throw err;
    } finally {
      client.release();
    }

    return new Response(JSON.stringify({ success: true, message: 'Data berhasil diupdate' }), { status: 200 });
  } catch (err: any) {
    return new Response(JSON.stringify({ success: false, error: err.message || 'Server error' }), { status: 500 });
  }
}
