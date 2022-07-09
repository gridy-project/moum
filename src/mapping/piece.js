export const mappingPieceToServerSimple = (server) => {
  if (server.type === "LINK") {
    return {
      link: server.content,
      status: "PRIVATE",
      boardType: server.type,
      // category: "기타",
    }
  } else if (server.type === "MEMO") {
    return {
      content: server.content,
      // status: "PRIVATE",
      boardType: server.type,
      // category: "기타",
    }
  }
}

export const mappingServerToPiece = (server) => {
  if (server.type === "LINK") {
    return {
      id: server.id,
      subject: server.title,
      link: server.link,
      content: server.explanation,
      image: server.imgPath,
      share: server.status,
      type: server.boardType,
      category: server.category
    }
  } else if (server.type === "MEMO") {
    return {
      id: server.id,
      subject: server.title,
      content: server.content,
      share: server.status,
      type: server.boardType,
      category: server.category
    }
  }
}

export const mappingPieceToServer = (piece) => {
  if (piece.type === "LINK") {
    return {
      id: piece.id,
      title: piece.subject,
      link: piece.link,
      explanation: piece.content,
      imgPath: piece.image,
      status: piece.share,
      boardType: piece.type,
      category: piece.category
    }
  } else if (piece.type === "MEMO") {
    return {
      id: piece.id,
      title: piece.subject,
      content: piece.content,
      status: piece.share,
      boardType: piece.type,
      category: piece.category
    }
  }
}