const BookCard = ({ bookInfo, handleModal, handleEditModal, handleRead }) => {
  const { title, date, isRead, id } = bookInfo;

  // Dinamik sınıf belirleyici
  const cardClass = isRead ? "book-card okundu" : "book-card okunmadi";

  return (
    <div
      className={`d-flex justify-content-between align-items-center p-3 mt-5 border rounded shadow ${cardClass}`}
    >
      <div>
        <h5 style={{ textDecoration: isRead ? "line-through" : "none" }}>
          {title}
        </h5>
        <p>{date}</p>
      </div>

      <div className="btn-group">
        <button
          onClick={() => handleModal(id, title)}
          className="btn btn-danger"
        >
          Sil
        </button>
        <button
          onClick={() => handleEditModal(bookInfo)}
          className="btn btn-primary"
        >
          Düzenle
        </button>
        <button
          onClick={() => handleRead(bookInfo)}
          className="btn btn-success "
        >
          {isRead ? "Okundu" : "Okunmadı"}
        </button>
      </div>
    </div>
  );
};

export default BookCard;
