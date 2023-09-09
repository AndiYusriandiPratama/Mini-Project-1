import axios from "axios";

const fetchUsers = async () => {
  try {
    const response = await axios.get("http://localhost:8001/users");
    return response.data;
  } catch (error) {
    // Tangani error di sini, misalnya:
    console.error("Error fetching users:", error);
    throw error; // Anda dapat melemparkan kembali error untuk penanganan lebih lanjut di komponen pemanggil.
  }
};

const addUser = async (data) => {
  try {
    const response = await axios.post("http://localhost:8001/users", data);
    return response.data;
  } catch (error) {
    console.error("Error adding user:", error);
    throw error;
  }
};

const loginUser = async (username, password) => {
  try {
    const response = await axios.get("http://localhost:8001/users");

    // Cek apakah data pengguna ditemukan di server
    if (response.status === 200) {
      const userData = response.data.find((user) => {
        // Memeriksa apakah username dan password sesuai
        return user.username === username && user.password === password;
      });

      if (userData) {
        // Jika username dan password sesuai, Anda dapat mengembalikan data pengguna atau token jika ada
        const token = userData.token; // Misalnya, jika server mengirim token
        return { success: true, token };
      } else {
        // Jika username atau password salah, kembalikan pesan kesalahan
        return { success: false, message: "Username atau password salah" };
      }
    } else {
      // Tangani kasus respons lainnya dari server pengguna jika diperlukan
      return { success: false, message: "Gagal mengambil data pengguna" };
    }
  } catch (error) {
    // Tangani kesalahan jika ada kesalahan dalam permintaan ke server
    return {
      success: false,
      message: "Terjadi kesalahan saat menghubungi server",
    };
  }
};

const checkEmailAvailability = async (email) => {
  try {
    const response = await axios.get("http://localhost:8001/users");

    const isEmailTaken = response.data.some((user) => {
      // Memeriksa apakah email sudah digunakan
      return user.email === email;
    });

    console.log(isEmailTaken);

    if (isEmailTaken) {
      console.log(`Email ${email} sudah digunakan.`);
      return true; // Mengembalikan true jika email sudah digunakan
    } else {
      console.log(`Email ${email} tersedia.`);
      return false; // Mengembalikan false jika email tersedia
    }
  } catch (error) {
    console.error("Error checking email availability:", error);
    throw error;
  }
};

export default {
  fetchUsers,
  loginUser,
  addUser,
  checkEmailAvailability,
};
