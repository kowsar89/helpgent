import React, {useState, useEffect, useRef} from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import ReactSVG from 'react-inlinesvg';
import apiService from 'apiService/Service.js';
import Checkbox from "Components/formFields/Checkbox.jsx";
import magnifier from 'Assets/svg/icons/magnifier.svg';
import loaders from 'Assets/svg/icons/loader.svg';
import { TagFilterDropdown } from './Style';

const TagFilter = props =>{
    const ref = useRef(null);
    const [state, setState] = useState({
		searchFilterTags: [],
        checkedForFilter: [],
        hasMore: false
	});
    const [tagsPageNumber, setTagsPageNumber] = useState(2);
    const { outerState, setOuterState, tagState, setTagState } = props;
    const { sessionFilterDropdown, tagFilterDropdownOpen } = outerState;
    const { allTags, filteredTagList, tagLoader } = tagState;
    const { searchFilterTags, checkedForFilter, hasMore } = state;

	const filterTextFieldRef = useRef(null);

    useEffect(() => {
        const checkIfClickedOutside = e => {

            if (tagFilterDropdownOpen && ref.current && !ref.current.contains(e.target)) {

                setOuterState({
					...outerState,
                    tagFilterDropdownOpen: false
                });
            }
        }
        document.addEventListener("mousedown", checkIfClickedOutside)
        return () => {
            // Cleanup the event listener
            document.removeEventListener("mousedown", checkIfClickedOutside)
        }
	}, [tagFilterDropdownOpen]);

    useEffect(() => {
        // if(searchFilterTags.length ===0){
            setState({
                ...state,
                hasMore: true,
                searchFilterTags: allTags,
            });
            
            setTagsPageNumber(2);
        // }
	}, [allTags]);

    const hadnleTagFilterApply = event =>{
        event.preventDefault();
        setOuterState({
            ...outerState,
            loader: true
            // addTagModalOpen: false
        });
        const termArgs = {
            term_ids: checkedForFilter.join(',')
        }
        const fetchSessionByTerm = async ()=>{
			const sessionByTermsResponse = await apiService.getAllByArg('/sessions', termArgs)
			return sessionByTermsResponse;
		}
        fetchSessionByTerm()
			.then( sessionByTermsResponse => {

				setOuterState({
                    ...outerState,
                    sessionList: sessionByTermsResponse.data.data,
                    tagFilterDropdownOpen: false,
                    sessionFilterDropdown: false,
                    hasMore: false,
                    loader: false
                    // addTagModalOpen: false
                });
			})
			.catch((error) => {
				console.log(error);
			})

    }

    const handleTagSelection = (e) =>{

        if(e.target.checked){
            setState({
                ...state,
                checkedForFilter: [
                    ...state.checkedForFilter,
                    e.target.id.replace('wpwax-vm-term-','')
                ],
            });
        }else{
            let temporaryArray = [...checkedForFilter];
            temporaryArray.splice(temporaryArray.indexOf(e.target.id.replace('wpwax-vm-term-','')),1);
            setState({
                ...state,
                checkedForFilter: temporaryArray
            })
        }
    }
    const handleTagSearch = event => {
        let keyword = event.target.value.trim().toLowerCase();
        const filtered = allTags.filter(tag => tag.name.toLowerCase().includes(keyword));

        setState({
            ...state,
            searchFilterTags: filtered
        });
    }

    const handleClearChecked = event =>{
        event.preventDefault();
        setState({
            ...state,
            checkedForFilter: []
        });

		filterTextFieldRef.current.value = '';
    }

    const fetchMoreTags = ()=>{
        const pageArg = {
            limit: '5',
            page: tagsPageNumber,
        };
        setTagsPageNumber(tagsPageNumber + 1);

        const fetchNextTags = async () => {
            const nextTagResponse = await apiService.getAllByArg('/messages/terms',pageArg);
            return nextTagResponse;
        };
        setTimeout(() => {
            fetchNextTags()
                .then((nextTagResponse) => {
                    if (nextTagResponse.data.data.length === 0) {
                        setState({
                            ...state,
                            hasMore: false,
                        });
                    } else {
                        setState({
                            ...state,
                            searchFilterTags: searchFilterTags.concat(nextTagResponse.data.data)
                        });
                    }
                })
                .catch((error) => {
                    console.log(error);
                });
        }, 1000);
    }

    return(
        <TagFilterDropdown className={sessionFilterDropdown && tagFilterDropdownOpen ? "wpwax-vm-tagfilter-show": null} ref={ref}>
            <div className="wpwax-vm-tag-search">
                <div className="wpwax-vm-input-icon"><ReactSVG src={magnifier} /></div>
				<input type="text" className="wpwax-vm-form__element" ref={filterTextFieldRef} placeholder="Search" onChange={handleTagSearch}/>
            </div>
            <div className={tagLoader ? "wpwax-vm-tag-filter-list-wrap wpwax-vm-loder-active": "wpwax-vm-tag-filter-list-wrap"}>
                {
                    tagLoader ?
                    <span className="wpwax-vm-loading-spin">
                        <span className="wpwax-vm-spin-dot"></span>
                        <span className="wpwax-vm-spin-dot"></span>
                        <span className="wpwax-vm-spin-dot"></span>
                        <span className="wpwax-vm-spin-dot"></span>
                    </span>
                    :
                    <div className="wpwax-vm-tag-filter-list" id="wpwax-vm-scrollable-filter">
                        <InfiniteScroll
                            dataLength={searchFilterTags.length}
                            next={fetchMoreTags}
                            hasMore={hasMore}
                            scrollableTarget='wpwax-vm-scrollable-filter'
                            loader={
                                <span className='wpwax-vm-more-loader'>
                                    <ReactSVG src={loaders} />
                                </span>
                            }
                        >
                            {
                                searchFilterTags.length !== 0 ?
                                    searchFilterTags.map((item,index)=>{

                                        return(
                                            <div className="wpwax-vm-tag-filter__check" key={index}>
                                                <Checkbox id={`wpwax-vm-term-${item.term_id}`} label={item.name} value={checkedForFilter.indexOf(item.term_id) === -1 ? false : true} onChange={e=>handleTagSelection(e)}/>
                                            </div>
                                        )
                                    })
                                    : <span className='wpwax-vm-empty'>Sorry!! No Tag Found</span>
                            }
                        </InfiniteScroll>
                    </div>
                }
            </div>
            

            <div className={searchFilterTags.length ===0 || checkedForFilter.length === 0 ? "wpwax-vm-tag-filter-action wpwax-vm-tag-filter-action-disabled" : "wpwax-vm-tag-filter-action"}>
                <a href="#" className="wpwax-vm-tag-filter-action__clear" onClick={handleClearChecked}>Clear all</a>
                <a href="#" className="wpwax-vm-btn wpwax-vm-btn-sm wpwax-vm-btn-primary" onClick={hadnleTagFilterApply}>Apply</a>
            </div>
        </TagFilterDropdown>
    )
}

export default TagFilter;