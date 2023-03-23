import React from 'react';

function DeckSelection() {
  return (
    <div>
      <div
        className='scroll-wrapper'
        ref={wrapperRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div className='scroller'>
          {
            // map out the posts
            shownPosts.map((post) => {
              return (
                <PostTile
                  key={post._id}
                  post={post}
                  onClick={handleTileClick}
                  tags={tags
                    .filter((t) => post.tag_ids.includes(t._id))
                    .map((t) => t.name)}
                />
              );
            })
          }
        </div>
        {showText ? (
          <div
            className='mouseOverText'
            ref={textRef}
            style={{
              position: 'absolute',
              left: mousePos.x + dragOffSetX,
              top: mousePos.y + dragOffSetY,
              zIndex: 999,
            }}
          >
            {/* DRAG */}
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default DeckSelection;
