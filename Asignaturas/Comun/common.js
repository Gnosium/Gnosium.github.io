var indexButtonsContainer = document.getElementById('index-buttons');
        var infoContainerHeadings = document.querySelectorAll('#info-container h1, #info-container h2, #info-container h3, #info-container h4, #info-container h5, #info-container h6');
        
        infoContainerHeadings.forEach(function (heading) {
            var button = document.createElement('button');
            button.textContent = heading.textContent;
            
            // Agregar clase según el nivel de encabezado
            button.classList.add('h' + heading.tagName.charAt(1));
            
            button.addEventListener('click', function () {
                heading.scrollIntoView({ behavior: 'smooth' });
            });
            
            indexButtonsContainer.appendChild(button);
        });

        function loadFiles(srcFolderPath) {
            var fileList = document.getElementById("file-list");
        
            // Realizar solicitud AJAX para obtener la vista de directorio
            var xhr = new XMLHttpRequest();
            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4) {
                    if (xhr.status === 200) {
                        // Limpiar fileList antes de agregar nuevos elementos
                        fileList.innerHTML = '';
        
                        // Analizar la respuesta HTML y extraer los nombres de archivo
                        var doc = new DOMParser().parseFromString(xhr.responseText, 'text/html');
                        var links = doc.querySelectorAll('#files a');
        
                        links.forEach(function (link, index) {
                            var fileName = link.querySelector('.name').textContent;
        
                            // Evitar agregar el nombre '..' a la lista
                            if (fileName !== '..') {
                                // Crear elementos de lista y agregarlos a fileList
                                var listItem = document.createElement('li');
                                listItem.innerHTML = `<div class="file-button">
                                                        <div class="file-textarea">
                                                        <p>${fileName}</p>
                                                        </div>
                                                        <div class="file-buttonarea">
                                                        <button id="inspect${index + 1}" class="inspect-button"><img src="../../Comun/inspect.png"></img></button>
                                                        <button id="download${index + 1}" class="download-button" data-filename="${fileName}"><img src="../../Comun/download.png"></img></button>
                                                        </div>
                                                      </div> `;
                                fileList.appendChild(listItem);
        
                                // Configurar eventos para los botones en cada iteración
                                setupFileButtons(index, fileName);
                            }
                        });
                    } else {
                        console.error("Error fetching files:", xhr.statusText);
                    }
                }
            };
        
            xhr.open("GET", srcFolderPath);
            xhr.send();
        }
        
        // Función para configurar eventos de los botones
        function setupFileButtons(index, fileName) {
            var inspectButton = document.getElementById(`inspect${index + 1}`);
            var downloadButton = document.getElementById(`download${index + 1}`);
        
            inspectButton.addEventListener('click', function () {
                // Acción para el botón Inspect (abrir en otra pestaña)
                window.open(`./src/${fileName}`, '_blank');
            });
        
            downloadButton.addEventListener('click', function () {
                // Acción para el botón Download (descargar)
                var fileUrl = `./src/${fileName}`;
                var a = document.createElement('a');
                a.href = fileUrl;
                a.download = fileName;
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
            });
        }
        
        
        