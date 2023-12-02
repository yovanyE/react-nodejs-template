export const styleModal = (colors) => ({
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    bgcolor: 'background.paper',
    backgroundColor: colors.blueAccent[800],
    border: '2px solid #000',
    boxShadow: '10px 5px 5px black',
    p: 0,
    padding: '16px 32px 24px'
  });
  
  export const headerStyle = (colors) => ({
    padding: '1px',
    color: colors.grey[100],
    borderBottom: `1px solid ${colors.grey[100]}`,
  });
  
  export const footerStyle = (colors) => ({
    borderTop: `1px solid ${colors.grey[100]}`,
    padding: '16px',
    textAlign: 'right',
  });
  
  export const styleIcon = {
    padding: 1,
    fontSize: 18,
  };