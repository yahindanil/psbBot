export default function LoadingScreen({ message = "Загрузка..." }) {
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "#F5ECDA",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 9999,
      }}
    >
      {/* Анимированный спиннер */}
      <div
        style={{
          width: "50px",
          height: "50px",
          border: "4px solid #E9CDA7",
          borderTop: "4px solid #DFB57F",
          borderRadius: "50%",
          animation: "spin 1s linear infinite",
          marginBottom: "20px",
        }}
      />

      <div
        style={{
          fontSize: "18px",
          fontWeight: "500",
          color: "#283B41",
          textAlign: "center",
          fontFamily: "Arial, sans-serif",
        }}
      >
        {message}
      </div>

      <style jsx>{`
        @keyframes spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
}
