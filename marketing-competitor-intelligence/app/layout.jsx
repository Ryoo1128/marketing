import './globals.css';

export const metadata = {
  title: 'Competitor Intelligence',
  description: '광고 라이브러리 기반 경쟁사 캠페인·소재 분석 대시보드',
};

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
