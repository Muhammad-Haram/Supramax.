            <div className="addProductItem">
              <label>Categories</label>
              <div className="checkbox-container">

                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    className="checkbox-input"
                    value="solution"
                    onChange={handleCategoryChange}
                  />
                  Solution
                </label>

                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    className="checkbox-input"
                    value="copper-data-cable"
                    onChange={handleCategoryChange}
                  />
                  Copper Data Cable
                </label>

                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    className="checkbox-input"
                    value="copper-multipair-cables"
                    onChange={handleCategoryChange}
                  />
                  Copper Multipair Cables
                </label>

                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    className="checkbox-input"
                    value="copper-coaxial-&-special-cables"
                    onChange={handleCategoryChange}
                  />
                  Copper Coaxial & Special Cables
                </label>

                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    className="checkbox-input"
                    value="copper-voice-termination-solution"
                    onChange={handleCategoryChange}
                  />
                  Copper Voice Termination Solution
                </label>

                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    className="checkbox-input"
                    value="copper-patch-cord"
                    onChange={handleCategoryChange}
                  />
                  Copper Patch Cord
                </label>

                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    className="checkbox-input"
                    value="copper-patch-panel"
                    onChange={handleCategoryChange}
                  />
                  Copper Patch Panel
                </label>


                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    className="checkbox-input"
                    value="information-outlet-&-connector"
                    onChange={handleCategoryChange}
                  />
                  Copper Information Outlet (IO) & Connector (Male Plug)
                </label>


                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    className="checkbox-input"
                    value="face-plate-&-floor-socket"
                    onChange={handleCategoryChange}
                  />
                  Face Plate & Floor Socket
                </label>


                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    className="checkbox-input"
                    value="fiber-accessories"
                    onChange={handleCategoryChange}
                  />
                  Fiber Accessories
                </label>

                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    className="checkbox-input"
                    value="fiber-cable"
                    onChange={handleCategoryChange}
                  />
                  Fiber Cable
                </label>

                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    className="checkbox-input"
                    value="fiber-patch-cord"
                    onChange={handleCategoryChange}
                  />
                  Fiber Patch Cord
                </label>

                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    className="checkbox-input"
                    value="cabinets"
                    onChange={handleCategoryChange}
                  />
                  Cabinets
                </label>

                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    className="checkbox-input"
                    value="cabinets-tray"
                    onChange={handleCategoryChange}
                  />
                  Cabinets Tray  / Accessories
                </label>

                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    className="checkbox-input"
                    value="PDU"
                    onChange={handleCategoryChange}
                  />
                  PDU (Power Distribution Unit)
                </label>
              </div>

              <div className="selected">
                Selected Categories:
                {categories.map((e, key) => (
                  <p key={key} className="category-seleted">{e || "None"}</p>
                ))}
              </div>
            </div>

            <div className="addProductItem">
              <label>Unit</label>
              <div>
                <label className="checkbox-label">
                  <input
                    type="radio"
                    name="unit"
                    value="reel"
                    onChange={handleUnitChange}
                  />
                  Reel
                </label>

                <label className="checkbox-label">
                  <input
                    type="radio"
                    name="unit"
                    value="box"
                    onChange={handleUnitChange}
                  />
                  Box
                </label>

                <label className="checkbox-label">
                  <input
                    type="radio"
                    name="unit"
                    value="mtr."
                    onChange={handleUnitChange}
                  />
                  Mtr.
                </label>

                <label className="checkbox-label">
                  <input
                    type="radio"
                    name="unit"
                    value="pcs"
                    onChange={handleUnitChange}
                  />
                 Pcs
                </label>

                <label className="checkbox-label">
                  <input
                    type="radio"
                    name="unit"
                    value="per-meter"
                    onChange={handleUnitChange}
                  />
                 Per Meter
                </label>

              </div>
            </div>