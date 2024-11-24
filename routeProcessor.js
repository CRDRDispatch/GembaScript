(async function () {
  const createModal = () => {
    const overlay = document.createElement("div");
    overlay.id = "custom-overlay";
    overlay.style.position = "fixed";
    overlay.style.top = "0";
    overlay.style.left = "0";
    overlay.style.width = "100%";
    overlay.style.height = "100%";
    overlay.style.background = "rgba(0, 0, 0, 0.5)";
    overlay.style.backdropFilter = "blur(5px)";
    overlay.style.zIndex = "9999";
    document.body.appendChild(overlay);

    const modal = document.createElement("div");
    modal.id = "custom-modal";
    modal.style.position = "fixed";
    modal.style.top = "50%";
    modal.style.left = "50%";
    modal.style.transform = "translate(-50%, -50%)";
    modal.style.width = "400px";
    modal.style.background = "white";
    modal.style.border = "1px solid #ccc";
    modal.style.boxShadow = "0 4px 6px rgba(0, 0, 0, 0.3)";
    modal.style.padding = "20px";
    modal.style.borderRadius = "10px";
    modal.style.zIndex = "10000";
    modal.style.textAlign = "center";

    modal.innerHTML = `
      <button id="close-btn" style="position: absolute; top: 10px; right: 10px; background: none; border: none; font-size: 16px; cursor: pointer;">✖</button>
      <div style="margin-bottom: 20px;">
        <img src="https://crdrdispatch.github.io/GembaScript/Logo.svg" alt="Logo" style="height: 70px; display: block; margin: 0 auto;">
      </div>
      <h2 style="font-family: Arial, sans-serif; margin-bottom: 20px;">Gimme That GEMBA</h2>
      <div id="progress-details" style="font-family: Arial, sans-serif; text-align: left; margin-bottom: 20px;">
        <p>Initializing...</p>
      </div>
      <button id="download-btn" style="display: none; margin: 0 auto; padding: 10px 20px; background-color: #4CAF50; color: white; border: none; border-radius: 5px; cursor: pointer; font-family: Arial, sans-serif; box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.2);">Download File</button>
    `;

    document.body.appendChild(modal);

    modal.querySelector("#close-btn").addEventListener("click", () => {
      modal.remove();
      overlay.remove();
    });

    return modal;
  };

  const updateProgress = (message, append = true) => {
    const progressDetails = document.getElementById("progress-details");
    if (progressDetails) {
      if (append) {
        progressDetails.innerHTML += `<p>${message}</p>`;
      } else {
        progressDetails.innerHTML = `<p>${message}</p>`;
      }
    }
    console.log(message);
  };

  const extractBehindProgress = (progressText) => {
    console.log("Extracting progress from text:", progressText);
    const match = progressText?.match(/(\d+)\s*behind/);
    const result = match ? `${match[1]} behind` : null;
    console.log("Extracted progress:", result);
    return result;
  };

  const cleanAssociateNames = (names) => {
    console.log("Cleaning associate names:", names);
    const cleanedNames = names.replace(/\(Cornerstone Delivery Service\)/g, "").trim();
    console.log("Cleaned associate names:", cleanedNames);
    return cleanedNames;
  };

  const extractAssociates = (container) => {
    console.log("Extracting associates.");
    const associates = Array.from(container.querySelectorAll(".css-1kttr4w"))
      .map((el) => cleanAssociateNames(el.textContent.trim()))
      .join(", ");
    console.log("Extracted associates:", associates);
    return associates;
  };

  const collectRoutes = async (selector, routes, maxScrolls = 20, scrollDelay = 100) => {
    console.log("Starting route collection. Selector:", selector);
    for (let i = 0; i < maxScrolls; i++) {
      console.log(`Scroll iteration ${i + 1} of ${maxScrolls}`);
      const elements = document.querySelectorAll(selector);
      console.log(`Found ${elements.length} route elements`);

      elements.forEach((el, index) => {
        console.log(`Processing element ${index + 1} of ${elements.length}`);
        const routeCodeElem = el.querySelector(".css-1nqzkik");
        const progressElem = el.querySelector(".css-1xac89n.font-weight-bold");

        const routeCode = routeCodeElem?.textContent.trim() || routeCodeElem?.getAttribute("title");
        const associateInfo = extractAssociates(el);
        const progressRaw = progressElem?.textContent.trim();
        const progress = extractBehindProgress(progressRaw); // Extract only "X behind"

        console.log("Route Code:", routeCode);
        console.log("Associate Info:", associateInfo);
        console.log("Progress:", progress);

        if (routeCode) {
          const existingRouteIndex = routes.findIndex(route => route.routeCode === routeCode);
          if (existingRouteIndex === -1) {
            routes.push({ routeCode, associateInfo, progress });
            console.log("Added route:", { routeCode, associateInfo, progress });
          } else {
            console.log("Skipped duplicate route with code:", routeCode);
          }
        } else {
          console.log("Skipped route due to missing code.");
        }
      });

      elements[elements.length - 1]?.scrollIntoView({ behavior: "smooth", block: "end" });
      await new Promise((resolve) => setTimeout(resolve, scrollDelay));
    }

    updateProgress(`Collected ${routes.length} unique routes so far.`);
    console.log("Completed route collection. Total routes:", routes.length);
  };

  const modal = createModal();
  const downloadBtn = modal.querySelector("#download-btn");

  try {
    console.log("Script started");
    updateProgress("Script started...");

    updateProgress(`Detected Cortex Version: V2`);
    console.log(`Cortex Version: V2`);

    const routeSelector = ".css-1muusaa";
    const routes = [];

    updateProgress("Scrolling to collect routes...");
    await collectRoutes(routeSelector, routes, 20, 100);

    updateProgress("Scrolling back to the top...");
    window.scrollTo({ top: 0, behavior: "smooth" });
    await new Promise((resolve) => setTimeout(resolve, 2000)); // Wait for everything to load again

    updateProgress("Rechecking routes...");
    await collectRoutes(routeSelector, routes, 20, 100);

    updateProgress(`Final collection complete. ${routes.length} unique routes found.`);
    console.log("Final routes collected:", routes);

    const behindRoutes = routes.filter((route) => route.progress?.includes("behind"));
    console.log("Behind Routes:", behindRoutes);

    if (behindRoutes.length > 0) {
      const fileContent = behindRoutes
        .map((route) => `${route.routeCode}: ${route.associateInfo} (${route.progress})`)
        .join("\n");

      const blob = new Blob([fileContent], { type: "text/plain" });
      const blobURL = URL.createObjectURL(blob);

      downloadBtn.style.display = "block";
      downloadBtn.textContent = `Download (${behindRoutes.length} Routes)`;
      downloadBtn.onclick = () => {
        const link = document.createElement("a");
        link.href = blobURL;
        link.download = "behind_routes.txt";
        link.click();
        URL.revokeObjectURL(blobURL);
      };

      updateProgress(`Exporting ${behindRoutes.length} behind routes.`);
    } else {
      updateProgress("No behind routes found.");
    }
  } catch (error) {
    console.error("Error during route data processing:", error);
    updateProgress(`Error: ${error.message}`);
  }
})();
