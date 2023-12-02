import toast from 'react-hot-toast';

const ConfirmationToast = ({ message }) => {
    return new Promise((resolve, reject) => {
        toast.custom(
            (t) => (
              <div
                style={{
                  opacity: t.visible ? 1 : 0,
                  transition: "opacity 100ms ease-in-out",
                  backgroundColor: '#FCD34D',
                  padding: '1rem',
                  borderRadius: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  fontSize: '1rem',
                }}
              >
                <span style={{ color: '#C98800', paddingRight: '0.5rem', fontSize: '1rem' }}>⚠️</span>
                <p style={{ color: '#C98800', fontSize: '1rem', margin: 0, flex: 1 }}>{message}</p>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toast.dismiss(t.id);
                    resolve(true);
                  }}
                  style={{
                    marginLeft: 'auto',
                    background: '#4CAF50',
                    color: 'white',
                    borderRadius: '5px',
                    padding: '0.5rem 1rem',
                    cursor: 'pointer',
                    border: 'none',
                  }}
                >
                  Confirmar
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toast.dismiss(t.id); // Cerrar el toast manualmente al hacer clic en Cancelar
                    resolve(false);
                  }}
                  style={{
                    marginLeft: '0.5rem',
                    background: '#F44336',
                    color: 'white',
                    borderRadius: '5px',
                    padding: '0.5rem 1rem',
                    cursor: 'pointer',
                    border: 'none',
                  }}
                >
                  Cancelar
                </button>
              </div>
            ),
            {
              duration: false, // El toast no se cerrará automáticamente
            }
          );
    });
};

export default ConfirmationToast;
