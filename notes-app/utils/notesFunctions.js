export const getNotes = async () => {
  try {
    const response = await fetch("/api/notes", {
      method: "GET",
    });

    const data = await response.json();

    if (!data) {
      return [];
    }

    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getNote = async (id) => {
  try {
    const response = await fetch(`/api/notes?id=${id}`, {
      method: "GET",
    });

    const data = await response.json();

    return data;
  } catch (error) {
    console.log(error);
  }
};

export const createNote = async (entry) => {
  try {
    const response = await fetch("/api/notes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(entry),
    });

    const data = await response.json();

    return data;
  } catch (error) {
    console.log(error);
  }
};

export const updateNote = async (entry) => {
    try {
        const response = await fetch('/api/notes', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(entry)
        });

        const data = await response.json();

        return data;
    } catch (error) {
        console.log(error)
    }
}

export const deleteNote = async (id) => {
  try {
    const response = await fetch(`/api/notes?id=${id}`, {
      method: "DELETE",
    });

    const data = await response.json();

    return data;
  } catch (error) {
    console.log(error);
  }
};
