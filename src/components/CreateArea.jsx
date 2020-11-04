import React, { useState } from "react";
import Zoom from "@material-ui/core/Zoom"
import AddIcon from "@material-ui/icons/Add"
import Fab from "@material-ui/core/Fab"

function CreateArea(props) {
  const [note, setNote] = useState({
    title: "",
    content: ""
  })
  // Для раскрытия текст-блока Take a note
  const [isExpanded, setExpanded] = useState(false)

  function handleChange(event) {
    const {name, value} = event.target
    setNote( prevNoteData => {
      return {
        ...prevNoteData,
        [name]: value
      }
    })
  }

  function submitNote(event) {
    props.onAdd(note)
    setNote({
      title: "",
      content: ""
    })
    event.preventDefault()
  }

  function expand() {
    setExpanded(true)
  }

  return (
    <div>
      <form class="create-note">
        {/* Если isExpanded, то рендерим инпут, иначе - ничего */}
        { isExpanded ? <input 
                          name="title" 
                          placeholder="Title" 
                          value={note.title}
                          onChange={handleChange}
                        />
                        : null
        }
        
        <textarea 
            name="content" 
            placeholder="Take a note..." 
            // Если isExpanded, то рендерим бОльшее по высоте текстовое поле, иначе - инлайновое 
            rows={isExpanded ? 3 : 1} 
            value={note.content}
            onClick={expand}
            onChange={handleChange}
        />
        {/* Чтобы zoom и кнопка Add появлялись только при раскрытии, то есть при isExpanded == true  */}
        <Zoom in={ isExpanded ? true : false}>
          <Fab onClick={submitNote}>
            <AddIcon />
          </Fab>
        </Zoom>
      </form>
    </div>
  );
}

export default CreateArea;
