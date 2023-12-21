import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "../css/TabBar.module.css";
import { faPlay, faPlus, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { maxNoteTabs, validateChangeTab } from "../utils";


const TabBar = ({ nTabs, activeTab, setActiveTab, addNoteTab, deleteNoteTab }) => {

  // Helpers for classes
  const isLeftDisabled = activeTab === 0;
  const isRightDisabled = activeTab === nTabs - 1;
  const isCreateDisabled = nTabs >= maxNoteTabs;

  return (
    <div className={styles.tabBar} >
      <div className={styles.tabNumbers}>
        {[ ...Array(nTabs).keys() ].map((i) => {
          const className = activeTab === i ? styles.tabButtonActive : "";
          return (
            <TabBarButton className={className} onClick={() => setActiveTab(i)} key={i}>{i+1}</TabBarButton>
          )})}
      </div>

      <TabBarButton isDisabled={isCreateDisabled} onClick={addNoteTab}>
        <FontAwesomeIcon icon={faPlus} />
      </TabBarButton>

      <div className={styles.tabControls}>
        <TabBarButton isDisabled={isLeftDisabled} onClick={() => setActiveTab(validateChangeTab(activeTab-1, nTabs))}>
          <FontAwesomeIcon icon={faPlay} flip="horizontal" size="lg" />
        </TabBarButton>
        <TabBarButton isDisabled={isRightDisabled} onClick={() => setActiveTab(validateChangeTab(activeTab+1, nTabs))}>
          <FontAwesomeIcon icon={faPlay} size="lg" />
        </TabBarButton>
        <TabBarButton onClick={deleteNoteTab}><FontAwesomeIcon icon={faTrashCan} size="lg" /></TabBarButton>
      </div>
    </div>
  );
};

const TabBarButton = ({ isDisabled = false, className = "", onClick, children }) => {
  return (
    <div
      className={[className, styles.tabButton, isDisabled ? styles.disabled : ""].join(' ')}
      onClick={() => { if (isDisabled) { return; } onClick(); }}
    >
      {children}
    </div>
  );
}

export default TabBar;