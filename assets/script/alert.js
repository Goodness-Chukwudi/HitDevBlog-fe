class ShowAlert {
    constructor () {

    }

    error = (message) => {
        const template = `
        <div class="alert alert-danger text-danger m-5 position-absolute end-0 top-0 container text-center alert-dismissible fade show" role="alert">
            <strong>${message}</strong>
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>`;

        const errorDiv = document.createElement("div");
        errorDiv.innerHTML = template;
        const body = document.getElementsByTagName("body");
        body[0].append(errorDiv);
    }
}

//Code reusability and modularization