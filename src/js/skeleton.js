function generatePlaceholderDivs(count) {
    const container = document.getElementById('container');
    container.innerHTML = ''; // Clear any existing content
  
    for (let i = 0; i < count; i++) {
      const div = document.createElement('div');
      div.classList.add('col-6', 'col-lg-3', 'mb-4', 'pb-4', 'mb-lg-0');
      div.setAttribute('aria-hidden', 'true');
  
      div.innerHTML = `
        <div class="card h-100 itemcard">
          <div class="container-fluid w-100 h-100 d-flex py-5 justify-content-center align-items-center bg-dark bg-opacity-50">
            <div class="spinner-border text-light m-5 mx-4" style="width: 3rem; height: 3rem;" role="status">
              <span class="visually-hidden">Loading...</span>
            </div>
          </div>
          <div class="card-body pb-0 mb-0">
            <div class="d-flex flex-column mb-2">
              <h5 class="mb-0 placeholder-glow">
                <span class="placeholder col-8"></span>
              </h5>
            </div>
            <div class="mb-3">
              <p class="placeholder-glow mb-0">
                <span class="placeholder col-6"></span>
              </p>
              <p class="placeholder-glow">
                <span class="placeholder col-4"></span>
              </p>
            </div>
            <div class="d-flex align-items-center mt-auto mb-1 flex-column placeholder-glow">
              <span class="placeholder col-10"></span>
            </div>
          </div>
          <a href="*" aria-hidden="true" class="btn btn-secondary disabled text-light rounded-bottom">View listing</a>
        </div>
      `;
  
      container.appendChild(div);
    }
  }

const placeholderCount = 8;
generatePlaceholderDivs(placeholderCount);