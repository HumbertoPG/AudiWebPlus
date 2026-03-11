export default function DeleteConfirmModal({ car, close, confirm }) {
  return (
    <div className="modal-overlay" onClick={close}>
      <div
        className="popup modern-popup"
        style={{ textAlign: "center" }}
        onClick={(e) => e.stopPropagation()}
      >
        <h3>¿Eliminar {car?.model_name}?</h3>
        <p style={{ color: "#666", marginBottom: "20px" }}>
          Esta acción no se puede deshacer.
        </p>

        <div className="popup-actions-row">
          <button className="btn-cancel" onClick={close}>
            Cancelar
          </button>
          <button className="btn-primary-round" onClick={confirm}>
            Eliminar
          </button>
        </div>
      </div>
    </div>
  );
}
