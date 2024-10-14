import { useState } from "react";
import Header from "./components/Header/Header";
import { toast } from "react-toastify";
import { v4 } from "uuid";
import BookCard from "./components/BookCard/BookCard";
import DeleteModal from "./components/DeleteModal/DeleteModal";
import EditModal from "./components/EditModal/EditModal";
import Scene from "./Scene";


function App() {
  //!yeni kitap adinin turuldugu state
  const [bookName, setBookName] = useState("");

  //!Tum kitap verilerinin tutuldugu state
  const [books, setBooks] = useState([]);

  //!Delete Modal
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [deleteTitle, setDeletetitle] = useState("");
  const [editItem, setEditItem] = useState({});

  //!Edit Modal

  const [showEditModal, setShowEditModal] = useState(false);
  //!inputunun iceriginni almak icin fonksiyton
  //input her degistiiunde caliri
  const handleChange = (e) => {
    setBookName(e.target.value);
  };
  //!Kitap ekleme fonksiyonu
  //console.log(bookName)
  const handleSubmit = (e) => {
    //!Formun varsayilan yenileme ozelligini kapattik
    e.preventDefault();

    //!eger kitap ismi yoksa yani input bos ise
    if (!bookName) {
      //!mesaj gosterme uyarisi islevi
      toast.warn("Kitap Adı Boş Olamaz");
      return;
    }

    //!yeni bir kitap olusturma objesi
    const newBook = {
      id: v4(),
      title: bookName,
      date: new Date().toLocaleString(),
      isRead: false,
    };
    //!Spread operator yardimi ile state icinde bulunan tum kitaplari dizi icineaktardik daha sonra yeni olusturdugumuz kitabi ekledik
    //console.log("yeni kitap", newBook)
    setBooks([...books, newBook]);

    toast.success("Kitap Basariyla Eklendi");

    //!ekleme islemi btince inputun icini temizle
    setBookName("");
  };

  const handleModal = (deleteBookId, deleteBookTitle) => {
    setDeleteId(deleteBookId);
    setDeletetitle(deleteBookTitle);

    setShowDeleteModal(true);
  };

  const handleDelete = () => {
    const filteredBooks = books.filter((book) => book.id !== deleteId);

    setBooks(filteredBooks);
    setShowDeleteModal(false);

    toast.error("Kitap Basariyla Silindi");
  };

  const handleEditModal = (editBook) => {
    setEditItem(editBook);
    setShowEditModal(true);
  };

  const handleEditBook = () => {
    const editIndex = books.findIndex((books) => books.id === editItem.id);

    const cloneBooks = [...books];
    cloneBooks.splice(editIndex, 1, editItem);
    setBooks(cloneBooks);

    setShowEditModal(false);
    toast.success("Kitap Basariyla Güncellendi");
  };

  //!Kitabi okundu olarak isaretleme

  const handleRead = (readBook) => {
    //!okundu olarak tam tersine cevirme
    const updatedBook = { ...readBook, isRead: !readBook.isRead };

    //!Guncellenecek elamanin index degerini bulma
    const index = books.findIndex((books) => books.id === readBook.id);
    //statin kopyasini olusturma
    const cloneBooks = [...books];
    //guncellenecek elamani indexini guncel kitapla degistirme
    cloneBooks[index] = updatedBook;
    setBooks(cloneBooks);
  };

  return (
    <>
      <div>
        
        <Header />
        <Scene/>

        <div className="container ">
          <form className="d-flex gap-3 mt-0" onSubmit={handleSubmit}>
            <input
              value={bookName}
              onChange={handleChange}
              placeholder="Bir Kitap İsmi Giriniz"
              className="form-control shadow"
              type="text"
            />
            <button className="btn btn-warning shadow p-3 ">Ekle</button>
          </form>
          {books.length === 0 ? (
            <h4>Henuz herhangi bir kitap eklenmedi</h4>
          ) : (
            
            books.map((book) => (
              <BookCard
                handleEditModal={handleEditModal}
                handleModal={handleModal}
                bookInfo={book}
                key={book.id}
                handleRead={handleRead}
              />
            ))
          )}
        </div>

        {showDeleteModal && (
          <DeleteModal
            bookTitle={deleteTitle}
            handleDelete={handleDelete}
            setShowDeleteModal={setShowDeleteModal}
          />
        )}

        {showEditModal && (
          <EditModal
            handleEditBook={handleEditBook}
            editItem={editItem}
            setEditItem={setEditItem}
            setShowEditModal={setShowEditModal}
          />
          
        )}
      </div>
      
    </>
  );
}

export default App;