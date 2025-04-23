import { createContext, useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

export const PlaygroundContext = createContext();

const initialData = [
  {
    id: uuidv4(),
    title: "DSA",
    files: [
      {
        id: uuidv4(),
        title: "index",
        code: 'cout<<"hello world";',
        language: "cpp",
      },
    ],
  },
  {
    id: uuidv4(),
    title: "FULL STACK",
    files: [
      {
        id: uuidv4(),
        title: "test",
        code: 'console.log("hello");',
        language: "javascript",
      },
    ],
  },
];

export const defaultCodes = {
  cpp: `#include <iostream>
using namespace std;
int main() {
    cout << "Hello World";
    return 0;
}`,
  javascript: 'console.log("hello world");',
  python: 'print("Hello World")',
  java: `public class Main {
    public static void main(String[] args) {
        System.out.println("Hello World");
    }
}`,
};

export const PlaygroundProvider = ({ children }) => {
  const [folders, setFolders] = useState(() => {
    const localData = localStorage.getItem("data");
    if (localData) {
      try {
        return JSON.parse(localData);
      } catch (error) {
        console.error("Failed to parse localStorage data:", error);
        localStorage.removeItem("data");
      }
    }
    return initialData;
  });

  const createNewPlayground = ({ folderName, fileName, language }) => {
    const newFolders = [
      ...folders,
      {
        id: uuidv4(),
        title: folderName,
        files: [
          {
            id: uuidv4(),
            title: fileName,
            code: defaultCodes[language.toLowerCase()],
            language,
          },
        ],
      },
    ];
    setFolders(newFolders);
  };

  const createNewFolder = (folderName) => {
    const newFolder = {
      id: uuidv4(),
      title: folderName,
      files: [],
    };
    const allFolders = [...folders, newFolder];
    setFolders(allFolders);
  };

  const deleteFolder = (id) => {
    const updateFoldersList = folders.filter((folderItem) => folderItem.id !== id);
    localStorage.setItem("data", JSON.stringify(updateFoldersList));
    setFolders(updateFoldersList);
  };

  const editFolderTitle = (newFolderName, id) => {
    const updateFoldersList = folders.map((folderItem) => {
      if (folderItem.id === id) {
        folderItem.title = newFolderName;
      }
      return folderItem;
    });

    localStorage.setItem("data", JSON.stringify(updateFoldersList));
    setFolders(updateFoldersList);
  };

  const createPlayground = (folderId, file) => {
    const copiedFolders = [...folders];
    for (let i = 0; i < copiedFolders.length; i++) {
      if (copiedFolders[i].id === folderId) {
        copiedFolders[i].files.push(file);
        break;
      }
    }
    localStorage.setItem("data", JSON.stringify(copiedFolders));
    setFolders(copiedFolders);
  };
  

  const editFileTitle = (newFileName, folderId, fileId) => {
    const copiedFolders = [...folders];
    for (let i = 0; i < copiedFolders.length; i++) {
      if (folderId === copiedFolders[i].id) {
        const files = copiedFolders[i].files;
        for (let j = 0; j < files.length; j++) {
          if (files[j].id === fileId) {
            files[j].title = newFileName;
            break;
          }
        }
        break;
      }
    }
    localStorage.setItem("data", JSON.stringify(copiedFolders));
    setFolders(copiedFolders);
  };

  const deleteFile = (folderId, fileId) => {
    const updatedFolders = folders.map(folder => {
      if (folder.id === folderId) {
        return {
          ...folder,
          files: folder.files.filter(file => file.id !== fileId),
        };
      }
      return folder;
    });

    localStorage.setItem("data", JSON.stringify(updatedFolders));
    setFolders(updatedFolders);
  };

  useEffect(() => {
    localStorage.setItem("data", JSON.stringify(folders));
  }, [folders]);

  const playgroundFeatures = {
    folders,
    createNewPlayground,
    createNewFolder,
    deleteFolder,
    editFolderTitle,
    editFileTitle,
    deleteFile,
    createPlayground,
  };

  return (
    <PlaygroundContext.Provider value={playgroundFeatures}>
      {children}
    </PlaygroundContext.Provider>
  );
};
