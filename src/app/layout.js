export const metadata = {
  title: 'Aplikasi Pengelola Absensi Pegawai',
  description: 'Aplikasi untuk mengelola data absensi pegawai',
};

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body>{children}</body>
    </html>
  );
}
